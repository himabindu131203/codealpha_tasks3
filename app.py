from flask import Flask, jsonify, render_template
import random

app = Flask(__name__)

# Route to serve the game page
@app.route('/')
def index():
    return render_template('index.html')

# Route to get shuffled cards (for matching game)
@app.route('/get_cards')
def get_cards():
    # Create a shuffled deck of card pairs (numbers 1-8)
    card_values = list(range(1, 9)) * 2
    random.shuffle(card_values)
    cards = [{'id': i, 'value': card_values[i]} for i in range(16)]
    return jsonify(cards)

if __name__ == "__main__":
    app.run(debug=True)
