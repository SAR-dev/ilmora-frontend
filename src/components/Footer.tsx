import { FaGitAlt } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className="footer bg-neutral text-neutral-content items-center justify-center p-4 mt-auto">
            <a href="https://github.com/SAR-dev" target="_blank" className="grid-flow-col items-center">
                <FaGitAlt className="size-6" />
                <p>Created By Sar-Dev</p>
            </a>
        </footer>
    )
}

export default Footer