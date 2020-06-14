import React, {useState} from 'react';
import {default as styled} from 'twin.macro'
import {Button} from "./component/button";
import {Pane} from "./component/pane";
import {Window} from "./component/window";
import {Toolbar} from "./component/toolbar";
import {Theme} from "./style/theme";
import {BrushIcon} from "./component/icon";
import {Nav} from "./component/nav";
// import {Draw} from "./component/draw";
import {Draw} from "./component/svgDraw"

export function App(props) {
    let [currentShape, setShape] = useState('rectangle')
    let [currentColor, setColor] = useState('black')
    let shapeHandler = (shape) => {
        setShape(shape)
    }
    let colorHandler = (color) => {
        setColor(color)
    }

    return (
        <Theme>
            <Window>
                <Window.Header >
                    <Toolbar>
                        <Button.Group>
                            <Button icon={'home'}><BrushIcon/></Button>
                            <Button icon={'home'}>move</Button>
                            <Button icon={'home'}>{currentShape}</Button>
                            <Button icon={'home'}>{currentColor}</Button>
                        </Button.Group>

                        <Button.Group>
                            <Button icon={'home'}>icon</Button>
                            <Button icon={'home'}>icon</Button>
                        </Button.Group>

                        <Button.Group>
                            <Button icon={'home'}>icon</Button>
                            <Button icon={'home'}>icon</Button>
                        </Button.Group>
                    </Toolbar>
                </Window.Header>
                <Window.Contents>
                    <Pane.Group>
                        <Pane.SideBar>
                            <Nav>
                                <Nav.Group title={'Shape'}>
                                    <Nav.Item onClick={shapeHandler.bind(null, 'circle')}>
                                        <span></span> circle
                                    </Nav.Item>
                                    <Nav.Item onClick={shapeHandler.bind(null, 'rectangle')}>
                                        rectangle
                                    </Nav.Item>
                                    <Nav.Item onClick={shapeHandler.bind(null, 'line')}>
                                        line
                                    </Nav.Item>
                                </Nav.Group>

                                <Nav.Group title={'color'}>
                                    <Nav.Item onClick={colorHandler.bind(null, 'red')}>
                                        <span></span> red
                                    </Nav.Item>
                                    <Nav.Item onClick={colorHandler.bind(null, 'green')}>
                                        green
                                    </Nav.Item>
                                    <Nav.Item onClick={colorHandler.bind(null, 'blue')}>
                                        blue
                                    </Nav.Item>
                                </Nav.Group>

                            </Nav>
                        </Pane.SideBar>
                        <Pane>
                            {/*<Draw shape={currentShape} color={currentColor}/>*/}
                            <Draw shape={currentShape} color={currentColor}/>
                        </Pane>
                    </Pane.Group>

                </Window.Contents>
                <Window.Footer className="toolbar toolbar-footer">
                    Footer
                </Window.Footer>
            </Window>
        </Theme>
    );
}

export default App;
