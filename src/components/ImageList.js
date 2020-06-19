import React from 'react';
import ImageCard from './ImageCard';
import './ImageList.css';

const ImageList = (props) => {
    const imgs = props.foundImages.map((img) => {
        return <ImageCard key={img.id} image={img} />;
    });

    return (
        <div className="image__list">{imgs}</div>
    )
};

export default ImageList;
