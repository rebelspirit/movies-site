import React, {useEffect} from 'react';

export const TrendsButton = (props) => {

    const selectedToggle = (event) => {
        if (!event.target.classList.contains(`selected${props.id}`)) {
            // create variable for elements width
            let positionAnchor = null;
            // get elements
            document.querySelectorAll(`.selector-anchor-${props.id}`).forEach((item, index) => {
                if (index === 0) {
                    positionAnchor = item.offsetWidth
                }
                item.classList.remove(`selected${props.id}`);
                item.classList.remove('.selected');
                item.removeAttribute('style')
            });
            // get bg selector
            const bg = document.querySelector(`.selector-background-${props.id}`);
            // add selected class to clicked element
            event.target.classList.toggle(`selected${props.id}`);
            // get element width and add them to bg style
            const selected = document.querySelector(`.selected${props.id}`);
            bg.style.width = `${selected.offsetWidth}px`;
            // change position according clicked target element
            if (!event.target.classList.contains('selected-position-1')) {
                bg.style.left = `${positionAnchor}px`;
                event.target.style.color = 'rgba(1, 38, 65, 1)';
            } else {
                bg.style.left = '0';
                event.target.style.color = 'rgba(1, 38, 65, 1)';
            }
            props.changeContent(!props.content);
        }
    };

    useEffect(() => {
        const selected = document.querySelector(`.selected${props.id}`);
        selected.style.color = 'rgba(1, 38, 65, 1)';
        const bg = document.querySelector(`.selector-background-${props.id}`);
        bg.style.width = `${selected.offsetWidth}px`;
    }, [props.id]);

    return (
        <>
            <h3 className={`selector-anchor selector-anchor-${props.id} selected-position-1 selected${props.id}`}
                onClick={selectedToggle}
            >{props.firstButton}
            </h3>
            <h3 className={`selector-anchor selector-anchor-${props.id} selected-position-2`}
                onClick={selectedToggle}
            >{props.secondButton}
            </h3>
            <div className={`selector-background selector-background-${props.id}`}/>
        </>
    )
};