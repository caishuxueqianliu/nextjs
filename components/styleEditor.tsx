
import React, {useState, useMemo, useRef, useEffect,useImperativeHandle} from 'react';
// @ts-ignore
import Prism from 'prismjs'

const StyleEditor = (props:{code:string}) => {
    const highlightedCode:string = useMemo(() => {
        return Prism.highlight(props.code, Prism.languages.css)
    }, [props.code])

    const codeInStyleTag:string = useMemo( () =>{
        return `<style>${props.code}</style>`
    },[props.code])

    // const test = ()=>{
    //     return Prism.highlight(props.code, Prism.languages.css)
    // }
    // useEffect(()=>{
    //     console.log(22)
    //     test()
    // },[props.code])
    const containerRef:any = useRef('')
    // useImperativeHandle(ref, () => ({
    //     goBottom: () => console.log('ok')
    // }))
    // useImperativeHandle(ref, () => ({
    //     goBottom: () => {
    //         console.log('ok')
    //         //containerRef.current.scrollTop = 100000
    //     },
    //     goTop: () => {
    //         console.log('ok')
    //         //containerRef.current.scrollTop = 0
    //     }
    // }))
    const goBottom = () => {
        containerRef.current.scrollTop = 100000
    }
    const goTop = () =>{
        containerRef.current.scrollTop = 0
    }
    useEffect(()=>{
        goBottom()
    },[props.code])

    return <div className={'styleEditor'} ref={containerRef}>
        <div  className={'code'} dangerouslySetInnerHTML={{ __html: codeInStyleTag}}></div>
        <pre className="" dangerouslySetInnerHTML={{ __html: highlightedCode}}></pre>
    </div>

}

// export default React.forwardRef(StyleEditor)
export default StyleEditor
