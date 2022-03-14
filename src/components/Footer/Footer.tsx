import GoToTop from "../GoToTop/GoToTop";

import iconInstagram from "../../assets/instagram.svg"
import iconGithub from "../../assets/github.svg"
import iconLinkedin from "../../assets/linkedin.svg"
import iconGmail from "../../assets/gmail.svg"

import "./Footer.scss";


const Footer = () => {
    return (
        <footer className="containerFooter">
            <section className="footer" aria-label="Headline: Default">
                <div className="text">
                    <span>© 2022 Victor de Souza Lima</span>
                </div>
                <div className="icons-socialNetworks">
                    <span>Follow me on social networks:</span>
                    <div className="icons">
                        <a href="https://www.instagram.com/vitiinho_souzza/"><img src={iconInstagram} alt="Instragram icon" /></a>
                        <a href="https://github.com/VitinhoSouza"><img src={iconGithub} alt="Github icon" /></a>
                        <a href="https://www.linkedin.com/in/victor-souza-1419b21ab/"><img src={iconLinkedin} alt="LinkedIn icon" /></a>
                        <a href="mailto:vitinhosouzajuatama@gmail.com"><img src={iconGmail} alt="Gmail icon" /></a>
                    </div>
                </div>
                <GoToTop/>
            </section>
        </footer>
    )
}

export default Footer;