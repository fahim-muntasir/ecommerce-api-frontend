import "./Contact.css"

const Contact = () => {
  return (
    <section className="contact">

        <div className="contact-bottom">
            <div className="container">
                <div className="contact-bottom-wrapper">
                    <div className="get-in-touch">
                        <h1 className="get-in-touch-title">Get In Touch</h1>
                        <p className="get-in-touch-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
                            quisquam
                            sint nobis esse.</p>
                    </div>
                    <div className="form-wrapper">
                        <div className="personal-information">
                            <div className="name-last-name">
                                <div className="personal-name">
                                    <p className="personal-information-title">Name *</p>
                                    <form>
                                        <input type="text" />
                                    </form>
                                </div>
                                <div className="personal-last-name">
                                    <p className="personal-information-title">Last Name *</p>
                                    <form>
                                        <input type="text" />
                                    </form>
                                </div>
                            </div>
                            <div className="personal-subject">
                                <p className="personal-information-title">Subject *</p>
                                <form>
                                    <input type="text" />
                                </form>
                            </div>
                            <div className="personal-message">
                                <p className="personal-information-title">Your Message *</p>
                                <form>
                                    <input type="text" />
                                </form>
                            </div>
                            <div className="subscribe-button">
                                <button>Subscribe</button>
                            </div>


                        </div>
                        <div className="company-info">
                            <h2 className="company-title">Uygi Store</h2>
                            <p className="company-desc">
                                Clotya Store
                                Germany, Berlin, example</p>
                            <a href="tel:Phone: +1 1234 567 88">Phone: example1234 567 88</a>
                            <div className="company-email">
                                <a href="mailto:Email: contact@example.com">Email: contact@example</a>
                            </div>

                            <h2 className="company-title">Opening Hours</h2>
                            <p className="company-desc-last">
                                Monday - Friday : 9am - 5pm</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className="contact-top">
                <div className="contact-map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.851309403328!2d28.99059781744385!3d41.050380600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cabb6bc87c1733%3A0xa9d84f06018f526c!2zVXouRHIuxZ5lcmFmZXR0aW4gU2FyYcOnb8SfbHU!5e0!3m2!1str!2str!4v1698665776814!5m2!1str!2str"
                        width="100%" height="500" allowFullScreen="" loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade" frameBorder="0"></iframe>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Contact