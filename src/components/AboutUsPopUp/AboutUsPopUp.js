import React from 'react';

export default function AboutUsPopUp() {
    return (
        <div className="popup popup-about">
          <div className="content-block">
            <a href="#" className="close-popup">&times;</a>            
            <p className="popup-title">Політика конфіденційності</p>
            <p className="popup-content">Використовуючи матеріали ФАКТИ ICTV, відкрите гіперпосилання на першоджерело обов'язкове.</p>
            <p className="popup-content">Усі матеріали з посиланням на агентство «Інтерфакс-Україна» не підлягають подальшому відтворенню та/або поширенню у будь-якій формі, окрім як з письмового дозволу агентства «Інтерфакс-Україна».</p>
          </div>
        </div>
    )
}