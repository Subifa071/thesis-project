
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import tokenizer_from_json

# Load the saved model

model = load_model('trained_model.keras')# Load tokenizer configuration from JSON file
with open('tokenizer_config.json', 'r') as json_file:
    tokenizer_json = json_file.read()

# Create tokenizer from JSON string
tokenizer = tokenizer_from_json(tokenizer_json)

def detect_fake_news(news):
  """Returns true if news is fake otherwise false"""
  test_sequences = tokenizer.texts_to_sequences([news])

  padded_sequence = pad_sequences(test_sequences, maxlen = 40, truncating='post')

  prediction = model.predict(padded_sequence)
  #  [0][0] holds the probability
  predicted_value = prediction[0][0]

  if predicted_value > 0.5:
    return False
  else:
    return True