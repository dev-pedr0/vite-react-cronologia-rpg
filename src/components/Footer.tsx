const Footer = () => {
    return (
        <footer className="mt-2 p-1 text-center"
            style={{
                borderTop: '1px solid var(--color-text-primary)',
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-bg-secondary)',
            }}
        >
            <p>
                Conecte-se comigo:&nbsp;
                <a
                    href="https://www.linkedin.com/in/pedro-conceicao1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'underline' }}   >
                     LinkedIn   
                </a>
                &nbsp;|&nbsp;
                <a
                    href="https://github.com/dev-pedr0"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                    GitHub
                </a>
            </p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>
                &copy; {new Date().getFullYear()} dev-pedr0/Pedro Costa
            </p>
        </footer>
    );
};

export default Footer;