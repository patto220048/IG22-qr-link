import './Loading.scss';
import { useState, CSSProperties } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import DotLoader from 'react-spinners/DotLoader';
import * as Dialog from '@radix-ui/react-dialog';

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: '1px solid black',
};
function Loading({
    isLoading,
    templateLoading,
    InputUrlLoading,
    urlLoading,
    loginLoading,
    profileLoading,
    resetPassLoading,
    signupLoading,
    uploadImgLoading,
}) {
    return (
        <section
            className="overlay"
            style={templateLoading || urlLoading ? { position: 'relative' } : { position: 'fixed' }}
        >
            <div className="loading">
                {templateLoading && (
                    <HashLoader
                        speedMultiplier={1.5}
                        color={templateLoading ? '#333333' : '#ffffff'}
                        loading={isLoading}
                        // cssOverride={override}
                        cssOverride={override}
                        size={70}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                )}

                {InputUrlLoading && (
                    <DotLoader
                        color={'#ffffff'}
                        loading={isLoading}
                        cssOverride={override}
                        size={35}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        speedMultiplier={1.5}
                    />
                )}

                {urlLoading && (
                    <DotLoader
                        color={'#ffffff'}
                        loading={isLoading}
                        cssOverride={override}
                        size={25}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        speedMultiplier={1.5}
                    />
                )}

                {loginLoading && (
                    <HashLoader
                        speedMultiplier={1.5}
                        color={templateLoading ? '#333333' : '#ffffff'}
                        loading={isLoading}
                        // cssOverride={override}
                        cssOverride={override}
                        size={70}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                )}
                {profileLoading && (
                    <HashLoader
                        speedMultiplier={1.5}
                        color={templateLoading ? '#333333' : '#ffffff'}
                        loading={isLoading}
                        // cssOverride={override}
                        cssOverride={override}
                        size={70}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                )}
                {resetPassLoading && (
                    <HashLoader
                        speedMultiplier={1.5}
                        color={templateLoading ? '#333333' : '#ffffff'}
                        loading={isLoading}
                        // cssOverride={override}
                        cssOverride={override}
                        size={70}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                )}
                {signupLoading && (
                    <HashLoader
                        speedMultiplier={1.5}
                        color={templateLoading ? '#333333' : '#ffffff'}
                        loading={isLoading}
                        // cssOverride={override}
                        cssOverride={override}
                        size={70}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                )}
                {uploadImgLoading && (
                    <HashLoader
                        speedMultiplier={1.5}
                        color={templateLoading ? '#333333' : '#ffffff'}
                        loading={isLoading}
                        // cssOverride={override}
                        cssOverride={override}
                        size={70}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                )}
            </div>
        </section>
    );
}

export default Loading;
