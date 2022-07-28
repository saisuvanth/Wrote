import { useState } from 'react'

const useClipboard = ({ name }: { name: string }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		setCopied(!copied);
		navigator.clipboard.writeText(name);
		setTimeout(() => {
			setCopied(false);
		}, 5000)
	}

	return { copied, handleCopy }
}

export default useClipboard