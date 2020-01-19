import React from 'react';

function Chapter(props){
    return(
<div className="layout border">
<h5>Chapter</h5>
{props.randomChapter && props.randomChapter.chTitle}
</div>);
}

export default Chapter;