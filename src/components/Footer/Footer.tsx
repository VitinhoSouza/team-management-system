import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <section className="footerSection" aria-label="Headline: Default">
                <div className="footerContent">
                    <div className="footerSection2">
                        <span>© 2021 Dell</span>
                        <a href="https://">Frequently Asked Questions</a>
                    </div>
                    <span>
                        Send any queries / requests / escalations through the Global intake Form:
                        <a href="https://"> Link to Form</a>
                    </span>
                </div>
            </section>
        </footer>
    )
}

export default Footer;