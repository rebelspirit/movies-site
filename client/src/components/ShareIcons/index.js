import React from 'react';
import './index.css';
import {
    FacebookShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    VKShareButton,
    OKShareButton,
    LivejournalShareButton,
    ViberShareButton,
} from 'react-share';
import {
    FacebookIcon,
    TwitterIcon,
    TelegramIcon,
    WhatsappIcon,
    VKIcon,
    OKIcon,
    LivejournalIcon,
    ViberIcon,
} from 'react-share';

export const ShareIcons = (props) => (
    <section className={"shareIcons-container"}>
        <h6>Поделится:</h6>
        <div className={"social-icons"}>
            <FacebookShareButton url={`https://gofilm.io${props.url}`} quote={props.title}>
            <FacebookIcon size={32} borderRadius={3} logoFillColor={"#fafafa"}/>
            </FacebookShareButton>

            <VKShareButton url={`https://gofilm.io${props.url}`} title={props.title}>
                <VKIcon size={32} borderRadius={3} logoFillColor={"#fafafa"}/>
            </VKShareButton>

            <TwitterShareButton url={`https://gofilm.io${props.url}`} title={props.title}>
                <TwitterIcon size={32} borderRadius={3} logoFillColor={"#fafafa"}/>
            </TwitterShareButton>

            <TelegramShareButton url={`https://gofilm.io${props.url}`} title={props.title}>
                <TelegramIcon size={32} borderRadius={3} logoFillColor={"#fafafa"}/>
            </TelegramShareButton>

            <LivejournalShareButton url={`https://gofilm.io${props.url}`} title={props.title}>
                <LivejournalIcon size={32} borderRadius={3} logoFillColor={"#fafafa"}/>
            </LivejournalShareButton>

            <OKShareButton url={`https://gofilm.io${props.url}`} title={props.title}>
                <OKIcon size={32} borderRadius={3} logoFillColor={"#fafafa"}/>
            </OKShareButton>

            <ViberShareButton url={`https://gofilm.io${props.url}`} title={props.title}>
                <ViberIcon size={32} borderRadius={3} logoFillColor={"#fafafa"}/>
            </ViberShareButton>

            <WhatsappShareButton url={`https://gofilm.io${props.url}`} title={props.title}>
                <WhatsappIcon size={32} borderRadius={3} logoFillColor={"#fafafa"}/>
            </WhatsappShareButton>
        </div>
    </section>
);
