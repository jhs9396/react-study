import React, {useState, useEffect} from 'react';
import {Shape} from './shape'
import tw, {styled, css} from 'twin.macro'

// let DrawCanvas = tw.div`
//   w-full h-full border border-gray-500 relative
// `
//
// const Dg = ({data}) => {
//     return (
//         <Shape data={data} />
//     )
// }
//
// export const Draw = ({shape}) => {
//     let [shapes, setShapes] = useState([]);
//     let [actions, setActions] = useState(null)
//
//     let handleClick = (evt) =>{
//
//     }
//
//     let handleMouseDown = (evt) => {
//         setActions({type: shape, x1: evt.nativeEvent.offsetX, y1: evt.nativeEvent.offsetY, x2: evt.nativeEvent.offsetX,
//             y2: evt.nativeEvent.offsetY})
//     }
//
//     let handleMouseUp = (evt) => {
//         setActions(Object.assign({}, actions, {
//                 x2: evt.nativeEvent.offsetX,
//                 y2: evt.nativeEvent.offsetY
//             }
//         ))
//
//         setShapes([{type:shape, x1: actions.x1, y1: actions.y1, x2: actions.x2, y2: actions.y2}].concat(shapes))
//         setActions(null)
//     }
//
//     let handleMouseMove = (evt) => {
//         if (actions != null) {
//             setActions(Object.assign({}, actions, {
//                     x2: evt.nativeEvent.offsetX,
//                     y2: evt.nativeEvent.offsetY
//                 }
//             ))
//         }
//     }
//
//     return (
//         <DrawCanvas onClick={handleClick} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
//             {shapes.map((s,idx)=>{
//                 return <Shape key={idx} data={s}/>
//             })}
//             {actions && <Dg data={actions}/>}
//         </DrawCanvas>
//     )
// }
let DrawCanvas = tw.canvas`
  w-full h-full border border-gray-500 relative
`

let Canvas = tw.canvas`
  w-full h-full border border-gray-500 relative
`

const Dg = (props) => {
    const canvasRef = React.useRef(null)
    let {x1, x2, y1, y2} = props.data
    let left = Math.min(x1, x2)
    let top = Math.min(y1, y2)
    let width = Math.abs(x1-x2)
    let height = Math.abs(y1-y2)


    const handleClick = (evt) => {

        console.log('props', props)
        console.log('ref', canvasRef)
        let canvas = canvasRef.current
        let ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        x1 = x2
        y1 = y2
        ctx.stroke()
    }

    return (
        <Canvas ref={canvasRef} onClick={handleClick}></Canvas>
        // <Shape data={data} />
    )
}

export const Draw = ({shape}) => {
    let canvasRef = React.useRef(null)
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState(undefined);

    const getCoordinates = (evt)  => {
        if (!canvasRef.current) {
            return;
        }
        return {x: evt.offsetX, y: evt.offsetY};
    }

    const startPaint = (evt) => {
        const coordinates = getCoordinates(evt);
        if (coordinates) {
            setIsPainting(true)
            setMousePosition(coordinates)
        }
    }

    const paint = (evt) => {
        if (isPainting) {
            const newMousePosition = getCoordinates(evt);
            if (mousePosition && newMousePosition) {
                drawLine(mousePosition, newMousePosition);
                setMousePosition(newMousePosition);
            }
        }
    }

    const exitPaint = (evt) => {
        setIsPainting(false)
    }

    const drawLine = (originPosition, newPosition) => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (context) {
            context.strokeStyle = 'red';
            context.lineJoin = 'round';
            context.lineWidth = 1;

            context.beginPath();
            context.moveTo(originPosition.x, originPosition.y);
            context.lineTo(newPosition.x, newPosition.y);
            context.closePath()

            context.stroke();
        }
    }

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current
        canvas.addEventListener('mousedown', startPaint)

        return () => {
            canvas.removeEventListener('mousedown', startPaint)
        }
    }, [startPaint])

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current
        canvas.addEventListener('mousemove', paint)

        return () => {
            canvas.removeEventListener('mousemove', paint)
        }
    }, [paint])

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        const canvas = canvasRef.current
        canvas.addEventListener('mouseup', exitPaint)
        canvas.addEventListener('mouseleave', exitPaint)

        return () => {
            canvas.removeEventListener('mouseup', exitPaint)
            canvas.removeEventListener('mouseleave', exitPaint)
        }
    }, [exitPaint])

    // let handleMouseDown = (evt) => {
    //     if (!canvasRef.current) {
    //         return;
    //     }
    //
    //     startPaint(evt)
    // }
    //
    // let handleMouseUp = (evt) => {
    //     if (!canvasRef.current) {
    //         return;
    //     }
    //
    //     paint(evt)
    // }
    //
    // let handleMouseMove = (evt) => {
    //     if (!canvasRef.current) {
    //         return;
    //     }
    //
    //     exitPaint(evt)
    // }

    return (
        <DrawCanvas ref={canvasRef}>
            {/*{shapes.map((s,idx)=>{*/}
            {/*    return <Shape key={idx} data={s}/>*/}
            {/*})}*/}
            {/*{actions && <Dg data={actions} />}*/}
        </DrawCanvas>
    )
}