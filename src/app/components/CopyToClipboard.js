import { useState } from "react"
import { MdContentCopy } from "react-icons/md"
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyToClipboardComponent = ({cameraAngle, setCameraShot }) => {
	const [isCopied, setIsCopied] = useState(false)

	const onCopyText = () => {
		setIsCopied(true)
		setTimeout(() => {
			setCameraShot(false)
			setIsCopied(false)
		}, 1500)
	  }

	return (
		<div className="bg-beige p-4 rounded mb-4">
			<div className="copy-area flex flex-col items-end">
				<CopyToClipboard 
					className="mb-2 cursor-pointer text-sm text-gray-500"
					text={cameraAngle} onCopy={onCopyText}>
					<span>{isCopied ? "Copied!" : <MdContentCopy />}</span>
				</CopyToClipboard>
				<div className="bg-gray-200">
					<pre className="text-sm text-gray-500 shadow-inner rounded p-2">{cameraAngle}</pre>
				</div>
			</div>
		</div>
	)
}

export default CopyToClipboardComponent