const AdminErrorDisplay = ({ error }: { error?: string }) => {
    if (error && error.length > 0) return (
        <div>
            <pre className="bg-error text-error-content px-5 py-3 card">
                {error}
            </pre>
        </div>
    )
}

export default AdminErrorDisplay