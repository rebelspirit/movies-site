import React from 'react'
import './index.css'
import {startParsingContent} from "../../actions/server.actions";
import {useDispatch} from "react-redux";

export const AdminDashboard = () => {
    const dispatch = useDispatch();

    return (
        <main>
            <section className={'main-container'}>
                <div className={'admin-container'}>
                    <button className={'admin-btn blue-btn'}
                            onClick={() => dispatch(startParsingContent())}
                    >Parsing
                    </button>
                    <button className={'admin-btn aqua-btn'}>Update</button>
                </div>
            </section>
        </main>
    )
};