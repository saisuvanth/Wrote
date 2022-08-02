import { RefObject, useEffect } from "react";

const useClickOutside = (ref: RefObject<any>, handler: (event: MouseEvent | TouchEvent) => void) => {
	useEffect(() => {
		let startedInside = false;
		let startedWhenMounted = false;

		const listener = (event: MouseEvent | TouchEvent) => {
			if (startedInside || !startedWhenMounted) return;
			if (!ref.current || ref.current.contains(event.target)) return;

			handler(event);
		};

		const validateEventStart = (event: MouseEvent | TouchEvent) => {
			startedWhenMounted = ref.current;
			startedInside = ref.current && ref.current.contains(event.target);
		};

		document.addEventListener("mousedown", validateEventStart);
		document.addEventListener("touchstart", validateEventStart);
		document.addEventListener("click", listener);

		return () => {
			document.removeEventListener("mousedown", validateEventStart);
			document.removeEventListener("touchstart", validateEventStart);
			document.removeEventListener("click", listener);
		};
	}, [ref, handler]);
};

export default useClickOutside;
