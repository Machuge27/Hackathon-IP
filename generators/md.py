from transformers import AutoTokenizer, AutoModelForCausalLM

# Specify the model name
model_name = "gpt-3.5-turbo"

# Download the tokenizer and model
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Save the model and tokenizer locally
model.save_pretrained("./local_model")
tokenizer.save_pretrained("./local_model")
