import { ReactNode } from 'react'
import toast from 'react-hot-toast'
import { useCopyToClipboard } from 'usehooks-ts'

const CopyToClipboard = ({ text, children }: { text: string, children: ReactNode }) => {
    const [, copy] = useCopyToClipboard()

    const handleCopy = () => {
        copy(text)
            .then(() => {
                toast.success(`"${text}" copied to clipboard!`)
            })
            .catch(() => {
                toast.error('Failed to copy!')
            })
    }

    return (
        <div onClick={handleCopy}>{children}</div>
    )
}

export default CopyToClipboard