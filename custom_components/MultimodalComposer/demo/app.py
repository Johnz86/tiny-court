
import gradio as gr
from gradio_multimodalcomposer import MultimodalComposer


example = MultimodalComposer().example_value()

demo = gr.Interface(
    lambda x:x,
    MultimodalComposer(),  # interactive version of your component
    MultimodalComposer(),  # static version of your component
    # examples=[[example]],  # uncomment this line to view the "example version" of your component
)


if __name__ == "__main__":
    demo.launch()
