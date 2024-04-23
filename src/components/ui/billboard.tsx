type BillboardProps = {
    children: React.ReactNode;
};

const Billboard: React.FC<BillboardProps> = ({ children }) => {
    return (
        <div className="fixed top-0 left-0 h-dvh w-dvw">
            {children}
        </div>
    );
};

export default Billboard;