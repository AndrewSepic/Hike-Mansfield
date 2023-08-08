// Requires & uses an animationComplete/setAnimationComplete state Variable
// And .animate CSS classes in the gobal.css folder

export function animateIn(timeout, setAnimationComplete) {
	console.log("Animate started")
	setTimeout(() => {
		setAnimationComplete(true)
		console.log("Animate ends")
	}, timeout)
}