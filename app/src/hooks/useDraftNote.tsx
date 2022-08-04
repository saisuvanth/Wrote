import { EditorState, RichUtils } from "draft-js";
import { MouseEventHandler, useContext } from "react"
import { INoteNode } from "../types";
import { HomeActionEnum } from "../utils/constants";
import HomeContext from "../utils/contexts/HomeContext"


const useDraftNote = () => {
	const { state: { nodes, activeNav }, dispatch } = useContext(HomeContext);

	const handleBoldToggle: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault()
		if (activeNav) {
			const temp = RichUtils.toggleInlineStyle((nodes[activeNav as number] as INoteNode).note as EditorState, 'BOLD');
			console.log(temp)
			dispatch({ type: HomeActionEnum.SET_NOTE, payload: { index: activeNav as number, state: temp } })
		}
	}

	const handleItalicToggle: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault()
		if (activeNav) {
			const temp = RichUtils.toggleInlineStyle((nodes[activeNav as number] as INoteNode).note as EditorState, 'ITALIC');
			console.log(temp)
			dispatch({ type: HomeActionEnum.SET_NOTE, payload: { index: activeNav as number, state: temp } })
		}
	}

	const handleUnderlineToggle: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault()
		if (activeNav) {
			const temp = RichUtils.toggleInlineStyle((nodes[activeNav as number] as INoteNode).note as EditorState, 'UNDERLINE');
			console.log(temp)
			dispatch({ type: HomeActionEnum.SET_NOTE, payload: { index: activeNav as number, state: temp } })
		}
	}

	const handleStrikeToggle: MouseEventHandler<HTMLDivElement> = (event) => {
		event.preventDefault()
		if (activeNav) {
			const temp = RichUtils.toggleInlineStyle((nodes[activeNav as number] as INoteNode).note as EditorState, 'STRIKETHROUGH');
			console.log(temp)
			dispatch({ type: HomeActionEnum.SET_NOTE, payload: { index: activeNav as number, state: temp } })
		}
	}

	const handleBulletToggle = () => {

	}

	const handleListToggle = () => {

	}

	const handleCenterAlign = () => {

	}

	return { handleBoldToggle, handleItalicToggle, handleUnderlineToggle, handleStrikeToggle };
}

export default useDraftNote;