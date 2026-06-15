<script lang="ts">
	// One consistent, Lucide-style stroke icon set for the whole composer, so the
	// paperclip / mic / send / attachment-card / remove icons share the same line
	// weight and visual language (stroke-width 2, rounded caps, no fill).
	let { name, size = 20 }: { name: string; size?: number } = $props();

	const PATHS: Record<string, string> = {
		paperclip:
			'<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
		mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v2a7 7 0 0 0 14 0v-2"/><path d="M12 19v3"/><path d="M8 22h8"/>',
		arrowUp: '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
		send: '<path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4 20-7Z"/>',
		stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
		x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
		check: '<path d="M20 6 9 17l-5-5"/>',
		play: '<polygon points="6 3 20 12 6 21 6 3"/>',
		image:
			'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.5-3.5a2 2 0 0 0-3 0L4 21"/>',
		music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
		video: '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
		file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/>',
		fileText:
			'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
		fileSheet:
			'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/><path d="M12 13v8"/>',
		fileZip:
			'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M11 4h2M11 8h2M11 12h2"/>'
	};
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
>{@html PATHS[name] || PATHS.file}</svg>

<style>
	svg {
		display: block;
		flex-shrink: 0;
	}
</style>
