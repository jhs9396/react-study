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
    let color = data.color

    const rectangle = {
        position:'absolute',
        background: 'rgba(0,0,0,0.1)',
        fill: 'white',
        stroke: `${color}`,
        width: width + 'px',
        height: height + 'px',
        x: left + 'px',
        y: top + 'px',
    }

    const circle = {
        position: 'absolute',
        // backgroundColor: 'white',
        background: 'rgba(0,0,0,0.1)',
        fill: 'white',
        stroke:`${color}`,
        // borderRadius: '100%',
        // display: 'inline-block',
        cx: left,
        cy: top,
        r: width,
        // width: width + 'px',
        // height: height + 'px',
        // left: left + 'px',
        // top: top + 'px'
    }

    const line = {
        stroke:`${color}`,
        strokeWidth: 2
    }

    if ('rectangle' == data.type) {
        return rectangle
    } else if ('circle' == data.type) {
        return circle
    } else {
        return line
    }
    // return 'rectangle' == data.type ? rectangle : circle
}

/**
 * inline css
 * @param data {type: ..., x1~2, y1~2}
 * @returns {*}
 */

const DrawShape = ({data}) => {
    //
    // let [points, setPoints] = useState({})
    //
    // setPoints(Object.assign({}, points, {
    //     points: `${data.x1}, ${data.y1} `
    // }))

    switch(data.type) {
        case 'rectangle':
            return <rect style={shapeStyle(data)}/>
        case 'circle':
            return <circle style={shapeStyle(data)}/>
        case 'line':
            return <line x1={data.x1} y1={data.y1} x2={data.x2} y2={data.y2} style={shapeStyle(data)}></line>
        default:
            return null
    }
}

export const Shape = ({data}) => {
    // console.log('shape data', data)

    return (
        <DrawShape data={data}/>
    )
}