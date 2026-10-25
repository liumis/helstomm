import React, { useEffect, useState } from 'react';
import { fetchDesignCategories, homeDesignCards } from '../api/designCategories';
import { FALLBACK_DESIGN_CATEGORIES } from '../data/designCategories';
import { fetchSlides } from '../api/slides';
import { fetchEngineeringHelpBanner } from '../api/inzinerinePagalba';
import { FALLBACK_ENGINEERING_HELP } from '../data/inzinerinePagalba';
import { FALLBACK_SLIDES } from '../data/carouselSlides';
import { fetchHomepageSettings } from '../api/homepage';
import { FALLBACK_HOMEPAGE } from '../data/pageChrome';
import { PageView } from '../types';
import { isOpenableFile } from '../lib/files';
import { Building, Shield, Leaf, ArrowRight, Download, ChevronLeft, ChevronRight, FileCode, CheckCircle2, type LucideIcon } from 'lucide-react';

const CARD_BADGE_ICONS: Record<string, LucideIcon> = {
  Building,
  Shield,
  Leaf,
};

const PastataiIcon = () => (
  <svg viewBox="0 0 83.667 83.667" className="w-full h-auto filter drop-shadow-md">
    <g>
      <circle fill="#b8cd33" cx="41.834" cy="41.834" r="40.334"/>
      <path fill="#ffffff" d="M41.834,83.667C18.767,83.667,0,64.901,0,41.833S18.767,0,41.834,0s41.833,18.767,41.833,41.833-18.767,41.834-41.833,41.834ZM41.834,3C20.421,3,3,20.42,3,41.833s17.421,38.834,38.834,38.834,38.833-17.421,38.833-38.834S63.246,3,41.834,3Z"/>
    </g>
    <g fill="#0f172a">
      <path d="M66.638,59.236h-3.153v-24.448c0-1.101-.896-1.996-1.996-1.996h-3.086v-1.48c0-.76-.618-1.379-1.379-1.379h-4.119c-.761,0-1.379.619-1.379,1.379v1.48h-3.626v-15.65c0-1.012-.823-1.835-1.835-1.835h-21.583c-1.012,0-1.835.823-1.835,1.835v42.094h-3.418c-.276,0-.5.224-.5.5v2.542c0,.276.224.5.5.5h47.41c.276,0,.5-.224.5-.5v-2.542c0-.276-.224-.5-.5-.5ZM52.525,31.312c0-.209.17-.379.379-.379h4.119c.209,0,.379.17.379.379v1.4h-4.877v-1.4ZM61.488,33.792c.549,0,.996.447.996.996v24.448h-7.895v-4.364c0-.615-.5-1.115-1.115-1.115h-3.058c-.615,0-1.115.5-1.115,1.115v4.364h-1.224v-25.444h13.41ZM50.302,59.234v-4.362c0-.063.052-.115.115-.115h3.058c.063,0,.115.052.115.115v4.362h-3.288ZM23.646,17.142c0-.46.375-.835.835-.835h21.583c.46,0,.835.375.835.835v42.094h-8.907v-8.382c0-.655-.533-1.188-1.188-1.188h-2.993c-.655,0-1.188.532-1.188,1.188v8.382h-8.979V17.142ZM33.625,59.129v-8.275c0-.104.084-.188.188-.188h2.993c.104,0,.188.084.188.188v8.275h-3.368ZM66.138,61.778H19.728v-1.542h3.135c.081.057.175.099.283.099h24.254c.048,0,.091-.015.135-.027.015.001.028.009.043.009h15.406c.095,0,.18-.034.255-.08h2.898v1.542Z"/>
      <path d="M29.42,18.338h-2.993c-.654,0-1.187.533-1.187,1.188v3.946c0,.655.533,1.188,1.187,1.188h2.993c.655,0,1.188-.533,1.188-1.188v-3.946c0-.655-.533-1.188-1.188-1.188ZM29.607,23.471c0,.104-.084.188-.188.188h-2.993c-.103,0-.187-.084-.187-.188v-3.946c0-.104.084-.188.187-.188h2.993c.104,0,.188.084.188.188v3.946Z"/>
      <path d="M33.812,24.659h2.993c.655,0,1.188-.533,1.188-1.188v-3.946c0-.655-.533-1.188-1.188-1.188h-2.993c-.655,0-1.188.533-1.188,1.188v3.946c0,.655.533,1.188,1.188,1.188ZM33.625,19.525c0-.104.084-.188.188-.188h2.993c.104,0,.188.084.188.188v3.946c0,.104-.084.188-.188.188h-2.993c-.104,0-.188-.084-.188-.188v-3.946Z"/>
      <path d="M41.198,24.659h2.993c.655,0,1.188-.533,1.188-1.188v-3.946c0-.655-.532-1.188-1.188-1.188h-2.993c-.655,0-1.188.533-1.188,1.188v3.946c0,.655.533,1.188,1.188,1.188ZM41.01,19.525c0-.104.084-.188.188-.188h2.993c.104,0,.188.084.188.188v3.946c0,.104-.084.188-.188.188h-2.993c-.104,0-.188-.084-.188-.188v-3.946Z"/>
      <path d="M29.42,28.781h-2.993c-.654,0-1.187.533-1.187,1.188v3.946c0,.655.533,1.188,1.187,1.188h2.993c.655,0,1.188-.533,1.188-1.188v-3.946c0-.655-.533-1.188-1.188-1.188ZM29.607,33.914c0,.104-.084.188-.188.188h-2.993c-.103,0-.187-.084-.187-.188v-3.946c0-.104.084-.188.187-.188h2.993c.104,0,.188.084.188.188v3.946Z"/>
      <path d="M33.812,35.102h2.993c.655,0,1.188-.533,1.188-1.188v-3.946c0-.655-.533-1.188-1.188-1.188h-2.993c-.655,0-1.188.533-1.188,1.188v3.946c0,.655.533,1.188,1.188,1.188ZM33.625,29.968c0-.104.084-.188.188-.188h2.993c.104,0,.188.084.188.188v3.946c0,.104-.084.188-.188.188h-2.993c-.104,0-.188-.084-.188-.188v-3.946Z"/>
      <path d="M41.198,35.102h2.993c.655,0,1.188-.533,1.188-1.188v-3.946c0-.655-.532-1.188-1.188-1.188h-2.993c-.655,0-1.188.533-1.188,1.188v3.946c0,.655.533,1.188,1.188,1.188ZM41.01,29.968c0-.104.084-.188.188-.188h2.993c.104,0,.188.084.188.188v3.946c0,.104-.084.188-.188.188h-2.993c-.104,0-.188-.084-.188-.188v-3.946Z"/>
      <path d="M29.42,39.224h-2.993c-.654,0-1.187.533-1.187,1.188v3.946c0,.655.533,1.188,1.187,1.188h2.993c.655,0,1.188-.532,1.188-1.188v-3.946c0-.655-.533-1.188-1.188-1.188ZM29.607,44.357c0,.104-.084.188-.188.188h-2.993c-.103,0-.187-.084-.187-.188v-3.946c0-.104.084-.188.187-.188h2.993c.104,0,.188.084.188.188v3.946Z"/>
      <path d="M33.812,45.544h2.993c.655,0,1.188-.532,1.188-1.188v-3.946c0-.655-.533-1.188-1.188-1.188h-2.993c-.655,0-1.188.533-1.188,1.188v3.946c0,.655.533,1.188,1.188,1.188ZM33.625,40.411c0-.104.084-.188.188-.188h2.993c.104,0,.188.084.188.188v3.946c0,.104-.084.188-.188.188h-2.993c-.104,0-.188-.084-.188-.188v-3.946Z"/>
      <path d="M41.198,45.544h2.993c.655,0,1.188-.532,1.188-1.188v-3.946c0-.655-.532-1.188-1.188-1.188h-2.993c-.655,0-1.188.533-1.188,1.188v3.946c0,.655.533,1.188,1.188,1.188ZM41.01,40.411c0-.104.084-.188.188-.188h2.993c.104,0,.188.084.188.188v3.946c0,.104-.084.188-.188.188h-2.993c-.104,0-.188-.084-.188-.188v-3.946Z"/>
      <path d="M29.42,49.667h-2.993c-.654,0-1.187.532-1.187,1.188v3.946c0,.655.533,1.188,1.187,1.188h2.993c.655,0,1.188-.532,1.188-1.188v-3.946c0-.655-.533-1.188-1.188-1.188ZM29.607,54.8c0,.104-.084.188-.188.188h-2.993c-.103,0-.187-.084-.187-.188v-3.946c0-.104.084-.188.187-.188h2.993c.104,0,.188.084.188.188v3.946Z"/>
      <path d="M41.198,55.988h2.993c.655,0,1.188-.532,1.188-1.188v-3.946c0-.655-.532-1.188-1.188-1.188h-2.993c-.655,0-1.188.532-1.188,1.188v3.946c0,.655.533,1.188,1.188,1.188ZM41.01,50.854c0-.104.084-.188.188-.188h2.993c.104,0,.188.084.188.188v3.946c0,.104-.084.188-.188.188h-2.993c-.104,0-.188-.084-.188-.188v-3.946Z"/>
      <path d="M50.417,39.588h3.058c.615,0,1.115-.5,1.115-1.115v-1.708c0-.615-.5-1.115-1.115-1.115h-3.058c-.615,0-1.115.5-1.115,1.115v1.708c0,.615.5,1.115,1.115,1.115ZM50.302,36.766c0-.063.052-.115.115-.115h3.058c.063,0,.115.052.115.115v1.708c0,.063-.052.115-.115.115h-3.058c-.063,0-.115-.052-.115-.115v-1.708Z"/>
      <path d="M56.929,39.588h3.059c.615,0,1.115-.5,1.115-1.115v-1.708c0-.615-.5-1.115-1.115-1.115h-3.059c-.615,0-1.115.5-1.115,1.115v1.708c0,.615.5,1.115,1.115,1.115ZM56.813,36.766c0-.063.052-.115.115-.115h3.059c.063,0,.115.052.115.115v1.708c0,.063-.052.115-.115.115h-3.059c-.063,0-.115-.052-.115-.115v-1.708Z"/>
      <path d="M50.417,45.704h3.058c.615,0,1.115-.5,1.115-1.115v-1.708c0-.615-.5-1.115-1.115-1.115h-3.058c-.615,0-1.115.5-1.115,1.115v1.708c0,.615.5,1.115,1.115,1.115ZM50.302,42.88c0-.063.052-.115.115-.115h3.058c.063,0,.115.052.115.115v1.708c0,.063-.052.115-.115.115h-3.058c-.063,0-.115-.052-.115-.115v-1.708Z"/>
      <path d="M56.929,45.704h3.059c.615,0,1.115-.5,1.115-1.115v-1.708c0-.615-.5-1.115-1.115-1.115h-3.059c-.615,0-1.115.5-1.115,1.115v1.708c0,.615.5,1.115,1.115,1.115ZM56.813,42.88c0-.063.052-.115.115-.115h3.059c.063,0,.115.052.115.115v1.708c0,.063-.052.115-.115.115h-3.059c-.063,0-.115-.052-.115-.115v-1.708Z"/>
      <path d="M50.417,51.818h3.058c.615,0,1.115-.5,1.115-1.115v-1.707c0-.615-.5-1.115-1.115-1.115h-3.058c-.615,0-1.115.5-1.115,1.115v1.707c0,.615.5,1.115,1.115,1.115ZM50.302,48.996c0-.063.052-.115.115-.115h3.058c.063,0,.115.052.115.115v1.707c0,.063-.052.115-.115.115h-3.058c-.063,0-.115-.052-.115-.115v-1.707Z"/>
      <path d="M56.929,51.818h3.059c.615,0,1.115-.5,1.115-1.115v-1.707c0-.615-.5-1.115-1.115-1.115h-3.059c-.615,0-1.115.5-1.115,1.115v1.707c0,.615.5,1.115,1.115,1.115ZM56.813,48.996c0-.063.052-.115.115-.115h3.059c.063,0,.115.052.115.115v1.707c0,.063-.052.115-.115.115h-3.059c-.063,0-.115-.052-.115-.115v-1.708Z"/>
      <path d="M56.929,57.695h3.059c.615,0,1.115-.5,1.115-1.115v-1.708c0-.615-.5-1.115-1.115-1.115h-3.059c-.615,0-1.115.5-1.115,1.115v1.708c0,.615.5,1.115,1.115,1.115ZM56.813,54.872c0-.063.052-.115.115-.115h3.059c.063,0,.115.052.115.115v1.708c0,.063-.052.115-.115.115h-3.059c-.063,0-.115-.052-.115-.115v-1.708Z"/>
    </g>
  </svg>
);

const InzineriniaiIcon = () => (
  <svg viewBox="0 0 83.667 83.667" className="w-full h-auto filter drop-shadow-md">
    <g>
      <circle fill="#b8cd33" cx="41.834" cy="41.834" r="40.334"/>
      <path fill="#ffffff" d="M41.834,83.667C18.767,83.667,0,64.901,0,41.833S18.767,0,41.834,0s41.833,18.767,41.833,41.833-18.767,41.834-41.833,41.834ZM41.834,3C20.421,3,3,20.42,3,41.833s17.421,38.834,38.834,38.834,38.833-17.421,38.833-38.834S63.246,3,41.834,3Z"/>
    </g>
    <g fill="#020202">
      <path d="M68.682,59.857c-.167-.218-.403-.345-.665-.359l-.38-.021-.005-17.176c.035-.334-.039-.793-.591-1.083l-11.973-6.281.003-3.562.125-.125c.094-.094.146-.221.146-.354s-.053-.26-.146-.354l-.124-.124.007-8.173h7.744v3.574h-.338c-.298.002-.569.12-.765.334-.205.225-.302.526-.272.848l.149,1.7c.059.666.812.698,1.214.704,0,.146.015.314.065.487-.084,0-.175.014-.273.043-.847.253-.804.921-.746,1.195.203.979,1.019,1.623,2.015,1.604.861-.017,1.673-.647,1.889-1.465.243-.922-.122-1.514-.477-1.883.319-.041.661-.168.751-.574.16-.727.146-1.485.133-2.18-.01-.505-.603-.803-.904-.814l-.42-.017.011-3.554,2.933-.002c.465,0,.847-.246.995-.638.131-.341.044-.763-.22-1.072l-2.258-2.671c-.061-.072-.141-.125-.23-.154l-12.888-4.092c-.005-.002-.01-.001-.016-.003-.015-.005-.031-.005-.047-.008-.028-.005-.055-.013-.084-.013l-1.476-.014c-.125-.002-.205.029-.289.089l-5.895,4.08c-.201.138-.408.454-.41.748,0,.001,0,.003,0,.004,0,0,0,0,0,0s0,0,0,0l.002.997c-.054-.081-.119-.154-.194-.218-.287-.242-.622-.231-.903-.224l-.804-.009-.047-1.56c-.011-.354-.221-.775-1.191-.775h-.006l-3.718-.009.004-2.072c0-.298-.118-.575-.332-.779-.202-.192-.473-.291-.729-.281-.561.03-.97.474-.974,1.058l-.011,2.076-3.71.013c-.242-.003-.573-.012-.829.183-.266.201-.421.523-.425.885l-.014,1.262-1.097.007c-.513.003-.963.468-.964.996l-.005,16.907c-.142-.092-.294-.148-.406-.173-.305-.066-.653.04-.907.28l-4.908,4.647-.457-6.082c.03-.065.05-.135.05-.211,0-.099-.036-.186-.086-.263l-.213-2.833c-.038-.501-.377-1.007-.955-1.007h-.001l-3.752.009c-.477,0-.878.406-.914.921l-1.94,27.25-.529.011c-.25.006-.477.127-.64.342-.189.25-.27.599-.2.865.083.323.401.803.939.803h53.646c.875,0,1.084-.574,1.133-.818.059-.288-.016-.603-.199-.841ZM54.069,34.937l-3.533,1.875v-.937c.034-.02.07-.036.099-.065l3.437-3.436-.002,2.563ZM59.405,19.093l2.152,2.153h-4.305s2.153-2.153,2.153-2.153ZM56.314,20.769l-1.768-1.767h3.535l-1.768,1.767ZM62.722,20.996l-1.993-1.994h3.987l-1.994,1.994ZM59.726,18.002c-.186-.155-.455-.155-.641,0h-4.989l-.453-3.189,10.044,3.189h-3.961ZM54.072,30.959l-3.536,3.536.002-7.198,3.534,3.535v.128ZM47.403,22.24c.088.077.2.128.326.128.124,0,.234-.05.322-.125l1.489.006-.004,14.503-1.041.538.009-10.73c0-.603-.316-.886-.659-1.102l-2.696-1.703.003-1.912c.164.224.422.389.67.39l1.582.007ZM49.646,19.002v2.247l-1.417-.006v-2.241h1.417ZM50.539,22.271h2.704l-2.705,2.706v-2.706ZM52.293,19.002l-1.647,1.648v-1.648h1.647ZM53.082,17.979h-2.452l1.505-3.243c.022-.048.029-.099.036-.149l.43.004.481,3.388ZM49.517,18.002h-2.744l4.042-2.797-1.298,2.797ZM47.229,19.002v2.237l-1.255-.005-.021-2.231h1.276ZM45.147,24.937l2.163,1.366c.192.122.192.139.192.255l-.01,11.551c0,.1.036.19.088.271l-2.434,1.292v-14.735ZM50.792,26.137l3.286-3.287-.005,6.568-3.281-3.281ZM54.579,21.245c-.046,0-.087.015-.129.026,0,0,0,0,0,0h-3.011l1.981-1.981,1.956,1.956h-.797ZM62.789,30.934s.005-.004.017-.009c.022.038.047.083.066.118.087.161.221.408.45.568-.251-.134-.439-.372-.533-.677ZM63.849,30.735c-.006-.009-.012-.018-.018-.027.016,0,.027-.004.032-.013-.003.011-.012.025-.015.041ZM63.927,29.698c-.022-.009-.045-.018-.064-.025-.073-.141-.051-.344-.035-.485,0-.008,0-.015.002-.023.033.309.303.535.48.684.048.04.094.079.136.117-.193-.14-.404-.223-.519-.268ZM67.786,21.245l-3.431.003c-.275,0-.499.223-.5.499l-.013,4.534c0,.269.212.49.48.501l.849.063c.009.522.01,1.055-.075,1.557-.069.003-.15.004-.209.005-.35.003-.829.007-1.008.438-.02.047-.033.093-.042.137-.005-.095-.028-.195-.098-.291-.195-.277-.525-.281-.875-.285-.077,0-.195-.002-.291-.01l-.13-1.482s.044-.093.044-.093l.837-.003c.275,0,.498-.225.498-.5v-4.571c0-.122-.049-.229-.121-.316l2.334-2.334,1.764,2.087c.032.038.043.081-.014.062ZM32.109,17.721c.061-.007.163-.004.224-.003.004,0,.106.001.111.001l4.119-.016c.274,0,.497-.223.498-.497l.05-2.576-.005,2.571c0,.276.223.5.499.501l4.253.01c.037,0,.107,0,.171.004l.04,1.328h-9.982l.014-1.247c0-.04.008-.065.008-.076ZM31.585,20.044h11s.006-.002.009-.002l1.268.014.123-.002c.063-.003.143-.004.167.078l-.005,3.896s0,0,0,0c0,0,0,0,0,0v16.173l-1.142.606v-4.824c0-.202-.122-.385-.309-.462-.187-.078-.402-.035-.545.108l-6.629,6.629v-5.57c0-.202-.122-.384-.309-.462-.188-.078-.402-.034-.545.108l-4.651,4.648-.021-20.93,1.588-.011ZM17.389,32.325l3.674-.04c.01.011.031.058.036.113l.189,2.521h-4.076l.177-2.595ZM15.497,60.021l1.646-24.101h4.219l.519,6.916c.014.192.138.359.318.43.181.069.383.028.524-.104l5.691-5.297.055,4.881s.003.006.003.009c.003.081.03.159.072.231.012.02.023.037.037.056.013.016.019.036.034.051.046.046.1.08.157.104.003.001.004.004.006.005,0,0,.001,0,.002,0,.081.033.168.036.254.025.02-.003.037-.006.056-.011.081-.02.158-.055.222-.116.002-.002.005-.002.007-.004.047-.046.105-.094.164-.142.137-.114.27-.248.378-.4l4.661-4.659v5.57c0,.202.122.385.309.462.187.076.401.035.545-.108l6.629-6.629v23.294l-26.829-.032c.177-.068.307-.233.321-.433ZM67.748,60.517l-24.743-.03v-18.551c.005-.003.011-.001.017-.004l11.547-6.129,12.068,6.334-.003.111.002,17.702c0,.266.207.484.473.499l.81.046s-.043.022-.171.022Z"/>
      <path d="M29.04,47.565h-8.732c-.276,0-.5.224-.5.5v2.943c0,.276.224.5.5.5h8.732c.276,0,.5-.224.5-.5v-2.943c0-.276-.224-.5-.5-.5ZM28.54,50.508h-7.732v-1.943h7.732v1.943Z"/>
      <path d="M40.028,47.565h-8.732c-.276,0-.5.224-.5.5v2.943c0,.276.224.5.5.5h8.732c.276,0,.5-.224.5-.5v-2.943c0-.276-.224-.5-.5-.5ZM39.528,50.508h-7.732v-1.943h7.732v1.943Z"/>
      <path d="M53.861,47.565h-8.731c-.276,0-.5.224-.5.5v2.943c0,.276.224.5.5.5h8.731c.276,0,.5-.224.5-.5v-2.943c0-.276-.224-.5-.5-.5ZM53.361,50.508h-7.731v-1.943h7.731v1.943Z"/>
      <path d="M64.851,47.565h-8.732c-.276,0-.5.224-.5.5v2.943c0,.276.224.5.5.5h8.732c.276,0,.5-.224.5-.5v-2.943c0-.276-.224-.5-.5-.5ZM64.351,50.508h-7.732v-1.943h7.732v1.943Z"/>
      <rect x="32.962" y="22.192" width="2.693" height="2.693"/>
      <rect x="38.465" y="22.192" width="2.693" height="2.693"/>
      <rect x="32.962" y="26.992" width="2.693" height="2.693"/>
      <rect x="38.465" y="26.992" width="2.693" height="2.693"/>
    </g>
  </svg>
);

const TvarusPastatasIcon = () => (
  <svg viewBox="0 0 83.667 83.667" className="w-full h-auto filter drop-shadow-md">
    <g>
      <circle fill="#b8cd33" cx="41.834" cy="41.834" r="40.334"/>
      <path fill="#ffffff" d="M41.834,83.667C18.767,83.667,0,64.901,0,41.833S18.767,0,41.834,0s41.833,18.767,41.833,41.833-18.767,41.834-41.833,41.834ZM41.834,3C20.421,3,3,20.42,3,41.833s17.421,38.834,38.834,38.834,38.833-17.421,38.833-38.834S63.246,3,41.834,3Z"/>
    </g>
    <g fill="#020202">
      <path d="M48.966,36.551c3.113-3.368,5.412-7.315,7.233-12.425l-.941-.336c-1.775,4.978-4.008,8.817-7.026,12.082-2.179,2.356-4.266,3.33-5.79,4.041-1.53.713-2.739,1.277-2.26,2.836l.956-.294c-.194-.632.032-.846,1.726-1.636,1.509-.704,3.79-1.768,6.102-4.269Z"/>
      <path d="M64.562,43.084l-4.441-4.698c1.696-2.942,2.588-6.254,2.724-10.127-.022-5.494-1.05-10.469-2.051-14.611-.019-.074-.053-.143-.102-.202-.381-.458-.941-1.035-1.452-1.185-.701-.202-1.653.617-1.921.94-.023.028-.044.059-.061.091-2.534,4.947-6.105,8.562-10.619,10.751l-4.614-4.87c-.333-.352-.848-.529-1.4-.482-.633.052-1.209.375-1.49.803l-22.318,23.681c-.066.07-.111.158-.128.254-.093.515-.181,1.215-.149,1.637.054.719,1.279,1.065,1.589,1.072l4.025.082-.018,16.104c0,.483.354,1.056.707,1.409.228.229.584.5.993.5h11.714c.833,0,1.68-1.218,1.68-1.897v-11.388s7.021.046,7.021.046l-.037,11.339c.015.842.901,1.91,1.876,1.91h11.361c.718,0,1.861-.92,1.861-1.684v-16.366s3.634-.025,3.634-.025c.521-.004,1.361-.345,1.728-.702.513-.498.305-1.941-.111-2.382ZM63.977,44.75c-.168.164-.754.417-1.038.419l-4.131.028c-.274.002-.496.226-.496.5l.003,16.842c-.048.211-.614.704-.863.704h-11.361c-.346,0-.869-.554-.876-.916l.039-11.827c0-.275-.222-.5-.497-.502l-8.023-.052h-.003c-.132,0-.259.052-.353.146-.094.094-.147.222-.147.354v11.891c-.005.242-.478.854-.679.896h-11.707c-.225-.033-.708-.652-.707-.906l.018-16.595c0-.272-.217-.495-.49-.501l-4.513-.092c-.131-.008-.476-.146-.619-.251-.002-.263.042-.695.115-1.136l22.265-23.635c.161-.238.465-.402.794-.429.252-.018.471.044.593.173l4.435,4.681c-4.985,4.403-5.935,9.732-4.977,12.197.38.978,1.06,1.509,1.893,1.474l-.051-.999c-.45.046-.756-.441-.91-.837-.837-2.153.156-7.155,4.869-11.226.061-.004.121-.019.179-.046,4.856-2.26,8.687-6.062,11.385-11.302.242-.269.719-.569.837-.581.147.043.483.304.891.777.979,4.062,1.974,8.925,1.995,14.245-.134,3.804-1.034,7.045-2.748,9.908-.428.426-5.941,5.725-12.358,3.061l-.383.924c1.41.585,2.777.822,4.066.822,4.435,0,7.938-2.79,9.056-3.796l4.352,4.602c.124.165.197.848.146.984Z"/>
    </g>
  </svg>
);

interface Props {
  setActiveView: (view: PageView) => void;
  onOpenAnalysisModal: () => void;
}

export const ProductCarousel: React.FC<Props> = ({ setActiveView, onOpenAnalysisModal }) => {
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [homeCards, setHomeCards] = useState(homeDesignCards(FALLBACK_DESIGN_CATEGORIES));
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [helpBanner, setHelpBanner] = useState(FALLBACK_ENGINEERING_HELP);
  const [headings, setHeadings] = useState(FALLBACK_HOMEPAGE);

  useEffect(() => {
    fetchSlides().then((items) => {
      if (items.length > 0) {
        setSlides(items);
        setActiveSlideIndex((prev) => (prev < items.length ? prev : 0));
      }
    });
    fetchDesignCategories().then((items) => {
      const cards = homeDesignCards(items);
      if (cards.length > 0) setHomeCards(cards);
    });
    fetchEngineeringHelpBanner().then(setHelpBanner);
    fetchHomepageSettings().then(setHeadings);
  }, []);

  const nextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: MES OPTIMIZUOJAME STATYBOS PROCESĄ */}
        <div className="mb-20">
          <div className="text-center mb-16">
            {headings.processBadge && (
              <span className="text-[#b8cd33] font-black uppercase text-xs tracking-widest bg-[#b8cd33]/20 px-3 py-1 rounded-full inline-block mb-3">
                {headings.processBadge}
              </span>
            )}
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 uppercase tracking-tight">
              {headings.processTitle} {headings.processHighlight && <span className="text-[#b8cd33]">{headings.processHighlight}</span>}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto mt-3 font-medium text-base">
              {headings.processIntro}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
            {homeCards.map((card, idx) => {
              const BadgeIcon = CARD_BADGE_ICONS[card.cardBadgeIcon] || Building;
              const CardIcon =
                card.cardIconKey === 'inzineriniai'
                  ? InzineriniaiIcon
                  : card.cardIconKey === 'tvarus'
                    ? TvarusPastatasIcon
                    : PastataiIcon;
              const eco = card.cardTheme === 'eco';

              return (
                <div
                  key={card.slug}
                  className={`${idx === 2 && homeCards.length === 3 ? 'col-span-2 md:col-span-1 ' : ''}bg-white rounded-2xl border border-slate-200 overflow-visible shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group`}
                >
                  <div>
                    <div className="relative">
                      <div className="h-36 sm:h-52 overflow-hidden relative rounded-t-2xl">
                        <img
                          src={card.cardImageUrl}
                          alt={card.cardTitle}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className={`absolute top-2 left-2 sm:top-3 sm:left-3 backdrop-blur-xs text-[9px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase flex items-center space-x-1 sm:space-x-1.5 ${
                          eco
                            ? 'bg-emerald-950/80 text-emerald-400'
                            : 'bg-slate-900/80 text-[#b8cd33]'
                        }`}>
                          <BadgeIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                          <span className="truncate">{card.cardBadge}</span>
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-4 sm:left-6 transform translate-y-1/2 z-10 w-[25%] max-w-[70px] sm:max-w-[85px]">
                        <CardIcon />
                      </div>
                    </div>
                    <div className="p-3 sm:p-6 pt-8 sm:pt-12">
                      <h3 className="text-sm sm:text-xl font-bold text-slate-900 uppercase leading-snug mt-4 sm:mt-6 mb-1.5 sm:mb-3">
                        {card.cardTitle}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                        {card.cardDescription}
                      </p>
                    </div>
                  </div>
                  <div className="p-3 pt-0 sm:p-6 sm:pt-0">
                    <button
                      onClick={() => setActiveView((card.cardTargetSlug || card.slug) as PageView)}
                      className={`w-full py-2 sm:py-2.5 bg-slate-100 text-slate-800 font-bold rounded-xl text-[10px] sm:text-xs transition-colors flex items-center justify-center space-x-1 sm:space-x-1.5 ${
                        eco ? 'hover:bg-emerald-600 hover:text-white' : 'hover:bg-[#b8cd33] hover:text-slate-950'
                      }`}
                    >
                      <span>{card.cardCtaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: SPRENDIMAI ŠIUOLAIKINEI STATYBAI (Carousel & Product Cards) */}
        <div className="bg-lime-50/60 rounded-3xl p-6 md:p-12 border border-[#b8cd33]/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900 uppercase tracking-tight">
                {headings.carouselTitle}
              </h2>
              <p className="text-slate-600 font-medium text-sm mt-1">
                {headings.carouselIntro}
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <button 
                onClick={prevSlide}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-800 hover:bg-[#b8cd33] transition-colors shadow-xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-bold text-slate-600 font-mono">
                {String(activeSlideIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
              </span>
              <button 
                onClick={nextSlide}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-800 hover:bg-[#b8cd33] transition-colors shadow-xs"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Carousel Featured Product */}
          {(() => {
            const current = slides[activeSlideIndex];
            if (!current) return null;
            return (
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 h-64 lg:h-80 rounded-xl overflow-hidden relative flex items-center justify-center">
                  <img 
                    src={current.image} 
                    alt={current.title} 
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-4 left-4 bg-slate-950 text-[#b8cd33] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {current.badge}
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 uppercase">
                    {current.title}
                  </h3>
                  <p className="text-[#b8cd33] font-bold text-sm">
                    {current.subtitle}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {current.description}
                  </p>

                  {current.highlights && current.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {current.highlights.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1 bg-lime-50 border border-[#b8cd33]/40 text-slate-800 rounded-full text-[11px] font-semibold"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  {current.downloads.length > 0 && (
                    <div className="pt-4 border-t border-slate-100">
                      <span className="text-xs font-bold uppercase text-slate-500 tracking-wider block mb-2">
                        {current.downloadsTitle}
                      </span>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold">
                        {current.downloads.map((item) => {
                          const Icon =
                            item.icon === 'code' ? FileCode : item.icon === 'check' ? CheckCircle2 : Download;
                          const iconClass =
                            item.icon === 'code'
                              ? 'text-blue-600'
                              : item.icon === 'check'
                                ? 'text-emerald-600'
                                : 'text-[#7a8a18]';
                          const className =
                            'px-3 py-1.5 bg-slate-100 hover:bg-[#b8cd33] text-slate-800 hover:text-slate-950 rounded-lg transition-colors flex items-center space-x-1';

                          if (isOpenableFile(item.url)) {
                            return (
                              <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className={className}>
                                <Icon className={`w-3.5 h-3.5 ${iconClass}`} />
                                <span>{item.label}</span>
                              </a>
                            );
                          }

                          return (
                            <span
                              key={item.label}
                              className="px-3 py-1.5 bg-slate-50 text-slate-400 rounded-lg flex items-center space-x-1"
                            >
                              <Icon className="w-3.5 h-3.5 text-slate-300" />
                              <span>{item.label}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {current.calculatorLabel && (
                    <button
                      type="button"
                      onClick={() => setActiveView('skaiciuokles')}
                      className="px-3 py-1.5 bg-white border border-slate-200 hover:border-[#b8cd33] text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                    >
                      {current.calculatorLabel}
                    </button>
                  )}

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        if (current.ctaAction === 'analysis') onOpenAnalysisModal();
                        else setActiveView(current.targetSlug as PageView);
                      }}
                      className="px-6 py-3 bg-[#b8cd33] hover:bg-[#a6ba2a] text-slate-950 font-bold rounded-xl text-sm transition-all shadow-xs"
                    >
                      {current.ctaLabel}
                    </button>
                    {current.analysisCtaLabel && current.ctaAction !== 'analysis' && (
                      <button
                        type="button"
                        onClick={onOpenAnalysisModal}
                        className="px-6 py-3 bg-white border border-slate-200 hover:border-slate-400 text-slate-800 font-bold rounded-xl text-sm transition-all"
                      >
                        {current.analysisCtaLabel}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlideIndex(idx)}
                className={`p-3 rounded-xl text-left border transition-all text-xs font-bold ${
                  activeSlideIndex === idx
                    ? 'bg-slate-900 text-[#b8cd33] border-slate-900 shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="truncate">{slide.name}</div>
                <div className="text-[10px] text-slate-400 font-normal truncate">{slide.tabSubtitle}</div>
              </button>
            ))}
          </div>

        </div>

        {helpBanner.enabled && (
          <div className="mt-16 bg-[#b8cd33] text-slate-950 rounded-2xl p-8 md:p-10 text-center shadow-lg relative overflow-hidden">
            <div className="max-w-3xl mx-auto space-y-3 relative z-10">
              <div className="flex justify-center mb-4">
                <svg viewBox="0 0 75.67 75.111" className="w-[67px] h-[67px] text-slate-950 fill-current">
                  <g id="_x32_ZFbyF">
                    <g>
                      <path d="M0,75.105l.152-1.706.319-8.526c.133-3.543,2.157-6.444,5.463-7.75l8.184-3.233c3.046-1.203,5.828-2.594,8.803-4.216l7.949,25.429-30.87.002Z"/>
                      <path d="M75.541,73.401l.129,1.705-30.837-.006,7.937-25.424c2.904,1.584,5.614,2.893,8.554,4.145l8.427,3.296c3.596,1.407,5.355,4.604,5.496,8.378l.294,7.906Z"/>
                      <path d="M55.501,24.232c2.101,4.662,1.566,11.124-2.576,13.659-1.053,4.511-3.395,8.573-7.339,11.146-5.583,3.643-12.826,2.692-17.551-1.976-2.649-2.617-4.216-5.956-5.363-9.495-4.204-2.377-4.68-8.27-2.36-12.914-1.767-1-3.057-2.153-4.155-3.892l2.708-1.254c1.534,2.122,3.7,3.263,6.294,3.935,8.465,2.196,17.483,1.917,25.883-.529,2.318-.675,4.108-1.823,5.831-3.489l2.577,1.465c-1.364,1.474-2.464,2.392-3.949,3.344ZM47.058,43.599c1.815-2.247,2.758-4.82,3.395-7.515l1.577-.81c2.416-3.164,2.158-6.063.418-9.693-9.664,2.838-19.75,3.003-29.3.423-2.042,2.824-1.919,6.419.212,8.878l1.718.708c.924,4.434,3.348,8.265,7.18,10.584,4.955,2.999,11.085,2.025,14.801-2.576Z"/>
                      <path d="M40.648,3.235c-1.6-.306-3.748-.412-5.743-.245.693,2.063,1.257,3.793,1.255,5.794l-.006,10.549c0,.584-1.129,1.21-1.669,1.106-.724-.14-1.26-.929-1.245-1.816.084-4.787.615-13.199-1.378-14.291-.445-.244-1.472.01-2.043.346-4.573,2.69-7.168,7.324-7.868,12.641-.108.822-.608,1.583-1.373,1.812-.646.193-1.87-.688-1.754-1.505.369-2.591.979-4.849,1.99-7.135C23.904,3.512,30.746-.423,38.379.036c9.653.58,17.612,7.268,18.459,17.247.067.792-.52,1.643-1.257,1.844-.54.147-1.688-.513-1.726-1.233-.319-6.042-3.935-11.28-9.576-13.394-.931.245-1.783,1.812-1.79,2.755l-.094,11.378c-.006.776-.534,1.527-1.203,1.669-.71.151-1.8-.553-1.808-1.363l-.089-9.444c.19-2.121.499-3.771,1.354-6.26Z"/>
                      <path d="M42.126,75.072l-8.55.039,2.14-15.752-2.001-.212c-.474-.05-.955-1.054-.959-1.538l-.025-2.995c-.009-1.082.876-1.956,1.955-1.95,2.573.013,4.872-.015,7.417.181,1.341.929,1.271,4.585.512,5.839-.296.488-1.437.658-2.547.615l2.057,15.773Z"/>
                    </g>
                  </g>
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                {helpBanner.title}
              </h3>
              {helpBanner.subtitle && (
                <p className="text-slate-900 font-medium text-sm md:text-base">
                  {helpBanner.subtitle}
                </p>
              )}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onOpenAnalysisModal}
                  className="px-8 py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all shadow-md"
                >
                  {helpBanner.ctaLabel}
                </button>
                {helpBanner.phone && (
                  <a
                    href={`tel:${helpBanner.phone.replace(/\s/g, '')}`}
                    className="px-4 py-3.5 text-slate-950 font-bold text-sm hover:underline"
                  >
                    {helpBanner.phoneLabel ? `${helpBanner.phoneLabel} ` : ''}
                    {helpBanner.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
