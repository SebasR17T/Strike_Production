from flask import render_template, flash, redirect, url_for
from app import app, mail
from forms import ContactForm
from flask_mail import Message

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    form = ContactForm()
    if form.validate_on_submit():
        msg = Message(
            subject=f"Contact Form Submission from {form.name.data}",
            sender=form.email.data,
            recipients=['your-email@gmail.com']
        )
        msg.body = f"""
        From: {form.name.data}
        Email: {form.email.data}
        Phone: {form.phone.data}
        Message: {form.message.data}
        """
        mail.send(msg)
        flash('Thank you for your message. We will contact you soon!', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html', form=form)

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

@app.route('/terms')
def terms():
    return render_template('terms.html')