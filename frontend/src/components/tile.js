import React, { useState, useEffect } from 'react';
import drop from '../pictures/page-1-copy-24@3x.png';
import useForceRender from '../helpers/customHooks';

import squares from '../pictures/squares.svg';
import plus from '../pictures/plus.svg';
import trash from '../pictures/trash.svg';

const getBase64 = (element, cb) => {

    if (element === null) {
        return;
    }
    let file = element.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        cb(reader.result);
    }
    reader.onerror = err => {
        console.log(err);
    }
}

const MoreOptions = ({ btnText, textOnChange, btnLink, linkOnChange, btnOption, optionOnChange }) => {
    return (
        <div className="moreOptions">
            <div>
                <label htmlFor="btn-text">btn Text</label>
                <input className="btn-text" id="btn-text"
                    value={btnText}
                    onChange={textOnChange}>
                </input>
            </div>
            <div>
                <label htmlFor="btn-link">btn Link</label>
                <input className="btn-link" id="btn-link"
                    value={btnLink}
                    onChange={linkOnChange}>
                </input>
            </div>
            <div>
                <select className="btn-select"
                    value={btnOption}
                    onChange={optionOnChange}>
                    <option value="_blank">New tab</option>
                    <option value="null">Same window</option>
                </select>
            </div>
        </div>
    )
}


const Options = ({ deleteOne, copyOne, options, optionsState, toggle }) => {

    return (
        <div className="options--container" onClick={toggle}>
            <button className="duplicate" onClick={copyOne}><img src={squares} alt='' />Duplicate</button>
            <button className="moreOptions" onClick={options}><img src={plus} alt='' />{optionsState ? "Less options" : "More options"}</button>
            <button className="delete" onClick={deleteOne}><img src={trash} alt='' /> Delete</button>
        </div>
    )
}

const Background = ({ image, getImage, ...props }) => {

    return (
        <>
            <div className="modular--background">
                {props.children}
                <div className="chip"></div>
                <div className="img--div"><img src={image} alt=""></img></div>
                <label htmlFor="file"><div></div>Upload image</label>
                <input type="file" id="file" onChange={getImage} />
            </div>
        </>
    )
}


const Tile = ({ data, deleteTile, copyTile }) => {

    const [subHead, setSubeHead] = useState(data.subHeader);
    const [head, setHead] = useState(data.heading);
    const [slider, setSlider] = useState(data.positive);
    const [btnText, setBtnText] = useState(data.btnText);
    const [btnOption, setBtnOption] = useState(data.btnOption);
    const [btnLink, setBtnlink] = useState(data.btnLink);
    const [color, setColor] = useState(data.color);
    const [img, setImg] = useState(null);
    data.subHeader = subHead;
    data.heading = head;
    data.btnText = btnText;
    data.btnLink = btnLink;
    data.btnOption = btnOption;
    data.color = color;

    const forceRender = useForceRender();

    const [optionsToggle, setOptionsToggle] = useState();
    const [backToggle, setBackToggle] = useState();
    const [moreOptions, setMoreOptions] = useState();


    const check = { backgroundSize: '20px' };

    useEffect(() => {
        getBase64(img, res => { data.background = res; forceRender() });
    }, [img])


    const clrs = ['#9700fd', '#60cefe', '#49e5a5', '#ffffff', '#000000', '#808080', '#dadada', '#f5f5f5']

    return (
        <React.Fragment>
            <div className="tile">
                <div className="subheader">
                    <div className="dnd"></div>
                    <input type="text" value={subHead} onChange={e => setSubeHead(e.target.value)} />
                </div>
                <div className="heading">
                    <input type="text" value={head} onChange={e => setHead(e.target.value)} />
                </div>
                <div className="positive">
                    <button
                        onClick={() => { setSlider(!slider); data.positive = !slider }}
                        style={slider ? { backgroundColor: '#dadada' } : { backgroundColor: '#9700fd' }}>
                        <div className="slider" style={slider ? { transform: 'translate(-100%,0)' } : { float: 'right' }}></div>
                    </button>
                </div>
                <div className="background">
                    <button onClick={() => setBackToggle(!backToggle)}>
                        <img className="btn-image" src={data.background} alt=""></img>
                        <img className="btn-drop" src={drop} alt="" />
                    </button>

                    {
                        backToggle &&
                        <>
                            <div className="backdrop__zeindex" onClick={() => setBackToggle(!backToggle)} />
                            <Background getImage={e => setImg(e.target)} image={data.background}>
                                <div className="colors">
                                    {clrs.map(c => {
                                        return (
                                            <button key={c} style={color === c ? { ...check, backgroundColor: c } : { backgroundColor: c }} onClick={() => setColor(c)} />
                                        )
                                    })}
                                </div>
                            </Background>
                        </>
                    }
                </div>
                <div className="options">
                    <button className="options--toggle" onClick={() => setOptionsToggle(!optionsToggle)}>...</button>
                    {
                        optionsToggle &&
                        <>
                            <div className="backdrop" onClick={() => setOptionsToggle(!optionsToggle)} />
                            <Options
                                toggle={() => setOptionsToggle(!optionsToggle)}
                                deleteOne={deleteTile}
                                copyOne={copyTile}
                                options={() => setMoreOptions(!moreOptions)}
                                optionsState={moreOptions} />
                        </>
                    }
                </div>
            </div>
            {
                moreOptions &&
                <MoreOptions
                    btnText={btnText}
                    btnLink={btnLink}
                    btnOption={btnOption}
                    textOnChange={e => setBtnText(e.target.value)}
                    linkOnChange={e => setBtnlink(e.target.value)}
                    optionOnChange={e => setBtnOption(e.target.value)}
                />
            }
        </React.Fragment>
    )
}

export default Tile;