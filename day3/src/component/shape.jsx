import React, {useState} from 'react';
import ReactDOM from 'react-dom'
import tw, {styled, css} from 'twin.macro'

let ShapeTemplate = tw.div`
  absolute border-2 border-gray-400
`

let CanvasTemplate = tw.canvas`
    absolute border-2 border-gray-400
`

// const Line = ({data}) => {
//     let left = Math.min(data.x1, data.x2)
//     let top = Math.min(data.y1, data.y2)
//     let width = Math.abs(data.x1-data.x2)
//     let height = Math.abs(data.y1-data.y2)
//
//     let canvasRef = React.useRef(null)
//     if (canvasRef.current != null) {
//         let ctx = canvasRef.current.getContext("2d")
//         ctx.beginPath()
//         ctx.moveTo(data.x1, data.y1);
//         ctx.lineTo(data.x2, data.y2);
//         data.x1 = data.x2
//         data.y1 = data.y2
//         ctx.stroke()
//     }
//
//     return <CanvasTemplate ref={canvasRef} style={{left: left+'px', top: top+'px', width: width+'px', height: height + 'px'}}></CanvasTemplate>
// }

const shapeStyle = (data) => {
    let left = Math.min(data.x1, data.x2)
    let top = Math.min(data.y1, data.y2)
    let width = Math.abs(data.x1-data.x2)
    let height = Math.abs(data.y1-data.y2)

    const rectangle = {
        border:'1px solid black',
        pointerEvents:'none',
        position:'absolute',
        width: width + 'px',
        height: height + 'px',
        left: left + 'px',
        top: top + 'px',
    }

    const circle = {
        position: 'absolute',
        backgroundColor: 'white',
        border:'1px solid black',
        borderRadius: '100%',
        display: 'inline-block',
        width: width + 'px',
        height: height + 'px',
        left: left + 'px',
        top: top + 'px'
    }

    return 'rectangle' == data.type ? rectangle : circle
}

/**
 * inline css
 * @param data {type: ..., x1~2, y1~2}
 * @returns {*}
 */

const DrawShape = ({data}) => {
    switch(data.type) {
        case 'rectangle':
            return <ShapeTemplate style={shapeStyle(data)}/>
        case 'circle':
            return <ShapeTemplate style={shapeStyle(data)}/>
        default:
            return null
    }
}

export const Shape = ({data}) => {
    console.log('shape data', data)

    return (
        <DrawShape data={data}/>
    )
}