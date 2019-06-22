from flask import Flask, render_template
app = Flask(__name__)
        # static_url_path='',
        # static_folder='/static',
        # template_folder='templates')

@app.route("/")
def w209():
    file="about9.jpg"
    # return render_template("index.html", file=file)
    # Makin' a change...
    return render_template("index.html")

if __name__ == "__main__":
    app.run()
