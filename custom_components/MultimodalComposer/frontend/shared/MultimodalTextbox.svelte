<script lang="ts">
	import { tick } from "svelte";
	import { text_area_resize, resize } from "../shared/utils";
	import { BlockTitle, ScrollFade } from "@gradio/atoms";
	import { Upload } from "@gradio/upload";
	import { Image } from "@gradio/image/shared";
	import type { I18nFormatter } from "@gradio/utils";
	import type { FileData, Client } from "@gradio/client";
	import type { WaveformOptions } from "@gradio/audio";
	import Icon from "./Icon.svelte";
	import { should_show_scroll_fade, type SelectData } from "@gradio/utils";
	import {
		MinimalAudioPlayer,
		MinimalAudioRecorder
	} from "@gradio/audio/shared";
	import type { InputHTMLAttributes } from "./types";

	let {
		value = $bindable(),
		value_is_output = false,
		lines = 1,
		i18n: _i18n,
		placeholder = "",
		disabled = false,
		label,
		info = undefined,
		show_label = true,
		max_lines,
		submit_btn = null,
		stop_btn = null,
		rtl = false,
		autofocus = false,
		text_align = undefined,
		autoscroll = true,
		root,
		file_types_string = null,
		max_file_size = null,
		upload,
		stream_handler,
		file_count = "multiple",
		max_plain_text_length = 1000,
		waveform_settings,
		waveform_options: _waveform_options = { show_recording_waveform: true },
		sources_string = "upload",
		active_source = $bindable<"microphone" | null>(),
		html_attributes = null,
		upload_promise = $bindable<Promise<any> | null>(),
		dragging = $bindable<boolean>(),
		onchange,
		onsubmit,
		onstop,
		onblur,
		onselect,
		oninput,
		onfocus,
		ondrag,
		onupload,
		onclear,
		onload: _onload,
		onerror,
		onstop_recording
	}: {
		value?: { text: string; files: FileData[] };
		value_is_output?: boolean;
		lines?: number;
		i18n: I18nFormatter;
		placeholder?: string;
		disabled?: boolean;
		label: string;
		info?: string | undefined;
		show_label?: boolean;
		max_lines: number;
		submit_btn?: string | boolean | null;
		stop_btn?: string | boolean | null;
		rtl?: boolean;
		autofocus?: boolean;
		text_align?: "left" | "right" | undefined;
		autoscroll?: boolean;
		root: string;
		file_types_string?: string | null;
		max_file_size?: number | null;
		upload: Client["upload"];
		stream_handler: Client["stream"];
		file_count?: "single" | "multiple" | "directory";
		max_plain_text_length?: number;
		waveform_settings: Record<string, any>;
		waveform_options?: WaveformOptions;
		sources_string?:
			| "upload"
			| "upload,microphone"
			| "microphone"
			| "microphone,upload";
		active_source?: "microphone" | null;
		html_attributes?: InputHTMLAttributes | null;
		upload_promise?: Promise<any> | null;
		dragging?: boolean;
		onchange?: (value: { text: string; files: FileData[] }) => void;
		onsubmit?: () => void;
		onstop?: () => void;
		onblur?: () => void;
		onselect?: (data: SelectData) => void;
		oninput?: () => void;
		onfocus?: () => void;
		ondrag?: (dragging: boolean) => void;
		onupload?: (files: FileData[] | FileData) => void;
		onclear?: () => void;
		onload?: (files: FileData[] | FileData) => void;
		onerror?: (error: string) => void;
		onstop_recording?: () => void;
	} = $props();

	let upload_component: Upload;
	let el: HTMLTextAreaElement | HTMLInputElement;
	let can_scroll = $state(false);
	let previous_scroll_top = $state(0);
	let user_has_scrolled_up = $state(false);
	let show_fade = $state(false);
	let uploading = $state(false);
	let oldValue = $state(value?.text ?? "");
	let recording = $state(false);
	let mic_audio = $state<FileData | null>(null);
	let full_container: HTMLDivElement;

	let sources = $derived(
		sources_string
			.split(",")
			.map((s) => s.trim())
			.filter((s) => s === "upload" || s === "microphone") as (
			| "upload"
			| "microphone"
		)[]
	);

	let file_types = $derived(
		file_types_string ? file_types_string.split(",").map((s) => s.trim()) : null
	);

	let show_upload = $derived(
		sources &&
			sources.includes("upload") &&
			!(file_count === "single" && value?.files?.length > 0)
	);

	function update_fade(): void {
		show_fade = should_show_scroll_fade(el);
	}

	$effect(() => {
		if (el && value?.text !== undefined) {
			tick().then(update_fade);
		}
	});

	$effect(() => {
		ondrag?.(dragging);
	});

	$effect(() => {
		if (value && oldValue !== value.text) {
			onchange?.(value);
			oldValue = value.text;
		}
	});

	$effect(() => {
		if (el && lines !== max_lines) {
			resize(el, lines, max_lines);
		}
	});

	$effect.pre(() => {
		if (el && el.offsetHeight + el.scrollTop > el.scrollHeight - 100) {
			can_scroll = true;
		}
	});

	const scroll = (): void => {
		if (can_scroll && autoscroll && !user_has_scrolled_up) {
			el.scrollTo(0, el.scrollHeight);
		}
	};

	async function handle_change(): Promise<void> {
		onchange?.(value);
		if (!value_is_output) {
			oninput?.();
		}
	}

	$effect(() => {
		value;
		if (autofocus && el) {
			el.focus();
		}
	});

	$effect(() => {
		if (can_scroll && autoscroll) {
			scroll();
		}
	});

	function handle_select(event: Event): void {
		const target: HTMLTextAreaElement | HTMLInputElement = event.target as
			| HTMLTextAreaElement
			| HTMLInputElement;
		const text = target.value;
		const index: [number, number] = [
			target.selectionStart as number,
			target.selectionEnd as number
		];
		onselect?.({ value: text.substring(...index), index: index });
	}

	async function handle_keydown(e: KeyboardEvent): Promise<void> {
		if (e.key === "Enter" && e.shiftKey && lines > 1) {
			e.preventDefault();
			await tick();
			onsubmit?.();
		} else if (
			e.key === "Enter" &&
			!e.shiftKey &&
			lines === 1 &&
			max_lines >= 1
		) {
			e.preventDefault();
			add_mic_audio_to_files();
			active_source = null;
			await tick();
			onsubmit?.();
		}
	}

	function handle_scroll(event: Event): void {
		const target = event.target as HTMLElement;
		const current_scroll_top = target.scrollTop;
		if (current_scroll_top < previous_scroll_top) {
			user_has_scrolled_up = true;
		}
		previous_scroll_top = current_scroll_top;

		const max_scroll_top = target.scrollHeight - target.clientHeight;
		const user_has_scrolled_to_bottom = current_scroll_top >= max_scroll_top;
		if (user_has_scrolled_to_bottom) {
			user_has_scrolled_up = false;
		}
		update_fade();
	}

	async function handle_upload(detail: FileData | FileData[]): Promise<void> {
		handle_change();
		if (Array.isArray(detail)) {
			for (let file of detail) {
				value.files.push(file);
			}
			value = value;
		} else {
			value.files.push(detail);
			value = value;
		}
		await tick();
		onchange?.(value);
		onupload?.(detail);
	}

	function remove_thumbnail(event: MouseEvent, index: number): void {
		handle_change();
		event.stopPropagation();
		value.files.splice(index, 1);
		value = value;
	}

	function handle_upload_click(): void {
		upload_component.open_upload();
	}

	function handle_stop(): void {
		onstop?.();
	}

	function add_mic_audio_to_files(): void {
		if (mic_audio) {
			value.files.push(mic_audio);
			value = value;
			mic_audio = null;
			onchange?.(value);
		}
	}

	function handle_submit(): void {
		add_mic_audio_to_files();
		active_source = null;
		onsubmit?.();
	}

	async function handle_paste(event: ClipboardEvent): Promise<void> {
		if (!event.clipboardData) return;
		const items = event.clipboardData.items;
		const text = event.clipboardData.getData("text");

		if (text && text.length > max_plain_text_length) {
			event.preventDefault();
			const file = new window.File([text], "pasted_text.txt", {
				type: "text/plain",
				lastModified: Date.now()
			});
			if (upload_component) {
				upload_component.load_files([file]);
			}
			return;
		}

		for (let index in items) {
			const item = items[index];
			if (item.kind === "file" && item.type.includes("image")) {
				const blob = item.getAsFile();
				if (blob) upload_component.load_files([blob]);
			}
		}
	}

	function handle_dragenter(event: DragEvent): void {
		event.preventDefault();
		dragging = true;
	}

	function handle_dragleave(event: DragEvent): void {
		event.preventDefault();
		const rect = full_container.getBoundingClientRect();
		const { clientX, clientY } = event;
		if (
			clientX <= rect.left ||
			clientX >= rect.right ||
			clientY <= rect.top ||
			clientY >= rect.bottom
		) {
			dragging = false;
		}
	}

	function handle_drop(event: DragEvent): void {
		event.preventDefault();
		dragging = false;
		if (event.dataTransfer && event.dataTransfer.files) {
			const files = Array.from(event.dataTransfer.files);

			if (file_types) {
				const valid_files = files.filter((file) => {
					return file_types.some((type) => {
						if (type.startsWith(".")) {
							return file.name.toLowerCase().endsWith(type.toLowerCase());
						}
						return file.type.match(new RegExp(type.replace("*", ".*")));
					});
				});

				const invalid_files = files.length - valid_files.length;
				if (invalid_files > 0) {
					onerror?.(
						`${invalid_files} file(s) were rejected. Accepted formats: ${file_types.join(", ")}`
					);
				}

				if (valid_files.length > 0) {
					upload_component.load_files(valid_files);
				}
			} else {
				upload_component.load_files(files);
			}
		}
	}

	// --- Helpers for type-aware attachment cards ---

	function get_filename(file: FileData): string {
		return (file as any).orig_name || (file as any).path?.split("/").pop() || (file as any).url?.split("/").pop() || "file";
	}

	function format_size(bytes: number | undefined): string {
		if (!bytes) return "";
		if (bytes < 1024) return bytes + " B";
		if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
		return (bytes / (1024 * 1024)).toFixed(1) + " MB";
	}

	function get_file_icon_name(file: FileData): string {
		const mime = (file as any).mime_type || "";
		const name = get_filename(file).toLowerCase();
		if (mime.includes("csv") || name.endsWith(".csv") || mime.includes("excel") || name.endsWith(".xls") || name.endsWith(".xlsx"))
			return "fileSheet";
		if (mime.includes("zip") || name.endsWith(".zip") || name.endsWith(".tar") || name.endsWith(".gz"))
			return "fileZip";
		if (mime.includes("pdf") || name.endsWith(".pdf") || mime.includes("word") || name.endsWith(".doc") || name.endsWith(".docx") || mime.includes("text") || name.endsWith(".txt"))
			return "fileText";
		return "file";
	}

	function is_image(file: FileData): boolean {
		return !!((file as any).mime_type?.includes("image"));
	}

	function is_audio(file: FileData): boolean {
		return !!((file as any).mime_type?.includes("audio"));
	}

	function is_video(file: FileData): boolean {
		return !!((file as any).mime_type?.includes("video"));
	}
</script>

<div
	class="full-container"
	class:dragging
	bind:this={full_container}
	ondragenter={handle_dragenter}
	ondragleave={handle_dragleave}
	ondragover={(e) => e.preventDefault()}
	ondrop={handle_drop}
	role="group"
	aria-label="Multimedia input field"
>
	<BlockTitle {show_label} {info} {rtl}>{label}</BlockTitle>
	<div class="input-container">
		{#if sources && sources.includes("microphone") && active_source === "microphone"}
			<div class="recording-overlay" class:has-audio={mic_audio !== null}>
				{#if !mic_audio}
					<div class="recording-content">
						<MinimalAudioRecorder
							label={label || "Audio"}
							{waveform_settings}
							{recording}
							{upload}
							{root}
							{max_file_size}
							bind:upload_promise
							onchange={(audio_value) => {
								mic_audio = audio_value;
							}}
							onstoprecording={() => {
								recording = false;
								onstop_recording?.();
							}}
							onclear={() => {
								active_source = null;
								recording = false;
								mic_audio = null;
								onclear?.();
							}}
						/>
					</div>
				{:else}
					<div class="recording-content">
						<MinimalAudioPlayer
							value={mic_audio}
							label={label || "Audio"}
							loop={false}
						/>
						<div class="action-buttons">
							<button
								class="confirm-button"
								onclick={() => {
									add_mic_audio_to_files();
									active_source = null;
									recording = false;
								}}
								aria-label="Attach audio"
							>
								<Icon name="check" size={18} />
							</button>
							<button
								class="cancel-button"
								onclick={() => {
									active_source = null;
									recording = false;
									mic_audio = null;
								}}
								aria-label="Clear audio"
							>
								<Icon name="x" size={18} />
							</button>
						</div>
					</div>
				{/if}
			</div>
		{/if}
		{#if show_upload}
			<Upload
				bind:upload_promise
				bind:this={upload_component}
				onload={handle_upload}
				{file_count}
				filetype={file_types}
				{root}
				{max_file_size}
				bind:dragging
				bind:uploading
				show_progress={false}
				disable_click={true}
				{onerror}
				hidden={true}
				{upload}
				{stream_handler}
			/>
		{/if}

		<!-- Composer bar: wraps attachment tray + input row -->
		<div class="composer-bar" class:has-files={(value?.files?.length ?? 0) > 0 || uploading}>

			<!-- Attachment tray (above text, only visible when files present) -->
			{#if (value?.files?.length ?? 0) > 0 || uploading}
				<div
					class="attachment-tray"
					aria-label="Uploaded files"
					data-testid="container_el"
				>
					{#each value?.files ?? [] as file, index}
						<span
							class="attachment-item"
							class:attachment-image={is_image(file)}
							class:attachment-audio={is_audio(file)}
							class:attachment-video={is_video(file)}
							class:attachment-file={!is_image(file) && !is_audio(file) && !is_video(file)}
							role="listitem"
							aria-label="File attachment"
						>
							{#if is_image(file)}
								<!-- Image thumbnail card -->
								<div class="img-card">
									<Image
										src={file.url}
										restProps={{
											title: get_filename(file),
											alt: get_filename(file),
											loading: "lazy",
											class: "img-thumb"
										}}
									/>
									<div class="img-filename">{get_filename(file)}</div>
									<button
										class="remove-btn remove-abs"
										onclick={(event) => remove_thumbnail(event, index)}
										aria-label="Remove file"
									><Icon name="x" size={13} /></button>
								</div>
							{:else if is_audio(file)}
								<!-- Audio card -->
								<div class="audio-card">
									<span class="card-icon audio-icon"><Icon name="play" size={14} /></span>
									<div class="card-meta">
										<span class="card-name">{get_filename(file)}</span>
										{#if (file as any).size}
											<span class="card-detail">{format_size((file as any).size)}</span>
										{/if}
									</div>
									<button
										class="remove-btn"
										onclick={(event) => remove_thumbnail(event, index)}
										aria-label="Remove file"
									><Icon name="x" size={13} /></button>
								</div>
							{:else if is_video(file)}
								<!-- Video card -->
								<div class="video-card">
									<div class="video-poster">
										<span class="video-play-icon"><Icon name="play" size={16} /></span>
									</div>
									<div class="card-meta">
										<span class="card-name">{get_filename(file)}</span>
										{#if (file as any).size}
											<span class="card-detail">{format_size((file as any).size)}</span>
										{/if}
									</div>
									<button
										class="remove-btn"
										onclick={(event) => remove_thumbnail(event, index)}
										aria-label="Remove file"
									><Icon name="x" size={13} /></button>
								</div>
							{:else}
								<!-- Generic file chip -->
								<div class="file-chip">
									<span class="file-emoji"><Icon name={get_file_icon_name(file)} size={16} /></span>
									<span class="card-name">{get_filename(file)}</span>
									{#if (file as any).size}
										<span class="card-detail">{format_size((file as any).size)}</span>
									{/if}
									<button
										class="remove-btn"
										onclick={(event) => remove_thumbnail(event, index)}
										aria-label="Remove file"
									><Icon name="x" size={13} /></button>
								</div>
							{/if}
						</span>
					{/each}
					{#if uploading}
						<div class="loader" role="status" aria-label="Uploading"></div>
					{/if}
				</div>
			{/if}

			<!-- Input row: upload btn + textarea + mic + submit -->
			<div class="input-row">
				{#if show_upload}
					<button
						data-testid="upload-button"
						class="icon-btn upload-btn"
						{disabled}
						onclick={handle_upload_click}
						aria-label="Upload a file"
					>
						<Icon name="paperclip" />
					</button>
				{/if}

				<div class="textarea-wrapper">
					<textarea
						data-testid="textbox"
						use:text_area_resize={{
							text: value.text,
							lines: lines,
							max_lines: max_lines
						}}
						class:no-label={!show_label}
						dir={rtl ? "rtl" : "ltr"}
						bind:value={value.text}
						bind:this={el}
						{placeholder}
						rows={lines}
						{disabled}
						onkeydown={handle_keydown}
						onblur={() => onblur?.()}
						onselect={handle_select}
						onfocus={() => onfocus?.()}
						onscroll={handle_scroll}
						onpaste={handle_paste}
						style={text_align ? "text-align: " + text_align : ""}
						autocapitalize={html_attributes?.autocapitalize}
						autocorrect={html_attributes?.autocorrect}
						spellcheck={html_attributes?.spellcheck}
						autocomplete={html_attributes?.autocomplete}
						tabindex={html_attributes?.tabindex}
						enterkeyhint={html_attributes?.enterkeyhint}
						lang={html_attributes?.lang}
					/>
					<ScrollFade visible={show_fade} position="absolute" />
				</div>

				{#if sources && sources.includes("microphone")}
					<button
						data-testid="microphone-button"
						class="icon-btn mic-btn"
						class:recording
						{disabled}
						onclick={async () => {
							if (active_source !== "microphone") {
								active_source = "microphone";
								await tick();
								recording = true;
							} else {
								active_source = null;
								recording = false;
							}
						}}
						aria-label="Record audio"
					>
						<Icon name="mic" />
					</button>
				{/if}

				{#if submit_btn}
					<button
						class="icon-btn submit-btn"
						data-testid="submit-button"
						class:padded-button={submit_btn !== true}
						{disabled}
						onclick={handle_submit}
						aria-label="Submit"
					>
						{#if submit_btn === true}
							<Icon name="arrowUp" />
						{:else}
							{submit_btn}
						{/if}
					</button>
				{/if}
				{#if stop_btn}
					<button
						class="icon-btn stop-btn"
						class:padded-button={stop_btn !== true}
						onclick={handle_stop}
						aria-label="Stop"
					>
						{#if stop_btn === true}
							<Icon name="stop" />
						{:else}
							{stop_btn}
						{/if}
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* ── Colour tokens ──
	   Solid fills reference the app's :root palette (--ink, --muted, --wood,
	   --red, --blue, --paper-strong; defined in tinycourt/styles.py) with the
	   literal hex as a fallback. Svelte scopes selectors, not custom-property
	   inheritance, so these vars cascade in from the host document. Alpha tints
	   (rgba(...)) stay literal — the courtroom is a fixed, light-only palette. */

	.full-container {
		width: 100%;
		position: relative;
		border: 1px solid transparent;
		transition: border-color 0.15s ease;
	}

	.full-container.dragging {
		border-color: var(--red, #a83229);
		border-radius: 1.3rem;
	}

	.full-container.dragging::after {
		content: "";
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.input-container {
		display: flex;
		position: relative;
		flex-direction: column;
		gap: 0;
	}

	/* ── Main composer bar ── */
	.composer-bar {
		display: flex;
		flex-direction: column;
		gap: 0;
		background: rgba(255, 253, 246, 0.88);
		border: 1px solid rgba(75, 43, 27, 0.18);
		border-radius: 1.3rem;
		box-shadow: 0 12px 28px rgba(35, 18, 10, 0.16);
		padding: 0.5rem;
		transition: transform 180ms ease, box-shadow 180ms ease;
	}

	.composer-bar:focus-within {
		transform: translateY(-0.12rem);
		box-shadow: 0 18px 40px rgba(35, 18, 10, 0.22);
	}

	/* ── Attachment tray ── */
	.attachment-tray {
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: 0.5rem;
		padding: 0.25rem 0.25rem 0.5rem;
		border-bottom: 1px solid rgba(75, 43, 27, 0.1);
		margin-bottom: 0.25rem;
	}

	/* Image attachment */
	.img-card {
		position: relative;
		width: 80px;
		height: 80px;
		border-radius: 12px;
		overflow: hidden;
		border: 1px solid rgba(75, 43, 27, 0.18);
		background: rgba(255, 255, 255, 0.5);
		flex-shrink: 0;
		cursor: default;
	}

	.img-card :global(.img-thumb) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.img-card :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.img-filename {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(35, 24, 19, 0.6);
		color: var(--paper-strong, #fffdf6);
		font-size: 0.65rem;
		padding: 2px 4px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		opacity: 0;
		transition: opacity 0.15s ease;
	}

	.img-card:hover .img-filename {
		opacity: 1;
	}

	.remove-abs {
		position: absolute !important;
		top: 4px !important;
		right: 4px !important;
		width: 1.4rem !important;
		height: 1.4rem !important;
		border-radius: 50% !important;
		background: rgba(35, 24, 19, 0.65) !important;
		color: var(--paper-strong, #fffdf6) !important;
		font-size: 0.7rem !important;
		display: grid !important;
		place-items: center !important;
		cursor: pointer !important;
		border: none !important;
		padding: 0 !important;
		line-height: 1 !important;
		opacity: 1 !important;
	}

	.remove-abs:hover {
		background: rgba(168, 50, 41, 0.85) !important;
	}

	/* Audio card */
	.audio-card {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.35rem 0.55rem 0.35rem 0.5rem;
		border-radius: 999px;
		border: 1px solid rgba(75, 43, 27, 0.18);
		background: rgba(255, 255, 255, 0.5);
		color: var(--wood, #4b2b1b);
		max-width: 240px;
		flex-shrink: 0;
		transition: background 0.12s ease;
	}

	.audio-card:hover {
		background: rgba(255, 255, 255, 0.78);
	}

	.audio-icon {
		color: var(--blue, #315f70);
		font-size: 0.8rem;
		flex-shrink: 0;
	}

	/* Video card */
	.video-card {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.3rem 0.55rem 0.3rem 0.3rem;
		border-radius: 12px;
		border: 1px solid rgba(75, 43, 27, 0.18);
		background: rgba(255, 255, 255, 0.5);
		color: var(--wood, #4b2b1b);
		max-width: 240px;
		flex-shrink: 0;
		transition: background 0.12s ease;
	}

	.video-card:hover {
		background: rgba(255, 255, 255, 0.78);
	}

	.video-poster {
		width: 44px;
		height: 36px;
		border-radius: 8px;
		background: rgba(75, 43, 27, 0.12);
		display: grid;
		place-items: center;
		flex-shrink: 0;
	}

	.video-play-icon {
		color: var(--wood, #4b2b1b);
		font-size: 0.9rem;
	}

	/* Generic file chip */
	.file-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 0.55rem 0.35rem 0.5rem;
		border-radius: 999px;
		border: 1px solid rgba(75, 43, 27, 0.18);
		background: rgba(255, 255, 255, 0.5);
		color: var(--wood, #4b2b1b);
		max-width: 280px;
		flex-shrink: 0;
		transition: background 0.12s ease;
	}

	.file-chip:hover {
		background: rgba(255, 255, 255, 0.78);
	}

	.file-emoji {
		font-size: 0.95rem;
		flex-shrink: 0;
		line-height: 1;
	}

	/* Shared card meta */
	.card-meta {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}

	.card-name {
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--ink, #231813);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 160px;
	}

	.card-detail {
		font-size: 0.68rem;
		color: var(--muted, #705c4c);
		white-space: nowrap;
	}

	.card-icon {
		flex-shrink: 0;
	}

	/* Remove button (for cards/chips, inline) */
	.remove-btn {
		flex-shrink: 0;
		width: 1.3rem;
		height: 1.3rem;
		border-radius: 50%;
		background: rgba(75, 43, 27, 0.1);
		color: var(--wood, #4b2b1b);
		font-size: 0.65rem;
		display: grid;
		place-items: center;
		cursor: pointer;
		border: none;
		padding: 0;
		line-height: 1;
		transition: background 0.12s ease, color 0.12s ease;
	}

	.remove-btn:hover {
		background: var(--red, #a83229);
		color: #fff;
	}

	/* Upload spinner */
	.loader {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		border: 2px solid rgba(75, 43, 27, 0.18);
		border-top-color: var(--red, #a83229);
		border-radius: 50%;
		width: 1.5rem;
		height: 1.5rem;
		animation: spin 1s linear infinite;
		flex-shrink: 0;
		align-self: center;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	/* ── Input row ── */
	.input-row {
		display: flex;
		align-items: flex-end;
		gap: 0.4rem;
		width: 100%;
	}

	/* ── Textarea ── */
	.textarea-wrapper {
		position: relative;
		flex-grow: 1;
		min-width: 0;
	}

	textarea {
		width: 100%;
		flex-grow: 1;
		outline: none !important;
		background: transparent;
		padding: 0.62rem 0.5rem;
		color: var(--ink, #231813);
		font-size: 1rem;
		line-height: 1.35;
		border: none;
		margin: 0;
		resize: none;
		position: relative;
		z-index: 1;
		text-align: left;
		font-family: inherit;
		min-height: 2.65rem;
		max-height: 10rem;
		overflow-y: auto;
	}

	textarea:disabled {
		-webkit-opacity: 1;
		opacity: 1;
	}

	textarea::placeholder {
		color: rgba(112, 92, 76, 0.75);
	}

	textarea[dir="rtl"] {
		text-align: right;
	}

	/* ── Icon buttons (upload, mic) ── */
	.icon-btn {
		width: 2.65rem;
		height: 2.65rem;
		display: grid;
		place-items: center;
		border-radius: 50%;
		cursor: pointer;
		flex-shrink: 0;
		border: none;
		transition: background 0.12s ease, transform 0.1s ease, box-shadow 0.12s ease;
	}

	.icon-btn :global(svg) {
		width: 1.1rem;
		height: 1.1rem;
	}

	.upload-btn,
	.mic-btn {
		background: rgba(75, 43, 27, 0.1);
		color: var(--wood, #4b2b1b);
	}

	.upload-btn:hover:not(:disabled),
	.mic-btn:hover:not(:disabled) {
		background: rgba(75, 43, 27, 0.18);
		transform: translateY(-1px);
	}

	.upload-btn:disabled,
	.mic-btn:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.mic-btn.recording {
		background: rgba(168, 50, 41, 0.15);
		color: var(--red, #a83229);
	}

	/* ── Submit button ── */
	.submit-btn {
		background: linear-gradient(180deg, #d84437, var(--red, #a83229));
		color: #fff;
		box-shadow: 0 4px 12px rgba(168, 50, 41, 0.3);
	}

	.submit-btn:hover:not(:disabled) {
		transform: translateY(-1px);
		box-shadow: 0 6px 18px rgba(168, 50, 41, 0.4);
	}

	.submit-btn:active:not(:disabled) {
		transform: translateY(0);
		box-shadow: 0 2px 6px rgba(168, 50, 41, 0.25);
	}

	.submit-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	/* ── Stop button ── */
	.stop-btn {
		background: rgba(75, 43, 27, 0.1);
		color: var(--red, #a83229);
	}

	.stop-btn:hover:not(:disabled) {
		background: rgba(168, 50, 41, 0.15);
	}

	.stop-btn:disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.padded-button {
		padding: 0 1rem;
		width: auto;
		border-radius: 999px;
		height: 2.65rem;
	}

	/* ── Recording overlay ── */
	.recording-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 253, 246, 0.95);
		border-radius: 1.3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
		padding: 1rem;
		backdrop-filter: blur(8px);
		animation: fadeIn 0.2s ease;
	}

	@keyframes fadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.recording-content {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
		max-width: 700px;
	}

	.recording-content :global(.minimal-audio-recorder),
	.recording-content :global(.minimal-audio-player) {
		flex: 1;
	}

	.action-buttons {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		flex-shrink: 0;
	}

	/* Confirm / cancel buttons in recording overlay */
	.confirm-button,
	.cancel-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.4rem;
		height: 2.4rem;
		padding: 0;
		border-radius: 50%;
		cursor: pointer;
		flex-shrink: 0;
		border: none;
	}

	.confirm-button {
		background: linear-gradient(180deg, #d84437, var(--red, #a83229));
		color: #fff;
	}

	.confirm-button:hover {
		transform: translateY(-1px);
	}

	.confirm-button:active {
		transform: scale(0.95);
	}

	.cancel-button {
		background: rgba(75, 43, 27, 0.1);
		color: var(--wood, #4b2b1b);
	}

	.cancel-button:hover {
		background: rgba(75, 43, 27, 0.18);
	}

	.cancel-button:active {
		transform: scale(0.95);
	}

	.confirm-button :global(svg),
	.cancel-button :global(svg) {
		width: 1rem;
		height: 1rem;
	}

	/* ── Mobile tweaks ── */
	@media (max-width: 768px) {
		.composer-bar {
			padding: 0.35rem;
		}

		.img-card {
			width: 64px;
			height: 64px;
		}

		.img-card .remove-abs {
			opacity: 1 !important;
		}

		.remove-btn {
			opacity: 1;
		}
	}
</style>
