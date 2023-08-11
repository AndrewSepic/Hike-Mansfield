// Requires & uses an animationComplete/setAnimationComplete state Variable
// And .animate CSS classes in the gobal.css folder

export function animateIn(timeout, setAnimationComplete) {
	setTimeout(() => {
		setAnimationComplete(true)
	}, timeout)
}