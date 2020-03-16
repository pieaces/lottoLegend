import Swal from "sweetalert2";

export default function generatorLoading(time:number) {
    const wrapper = document.querySelector<HTMLElement>('.func3-num-wrapper');
    wrapper.classList.add('none');
    Swal.fire({
        title: `<div class="lds-circle"><div></div></div>`,
        footer: '주어진 데이터로 고객님의 번호를 조합중입니다',
        allowOutsideClick: false,
        timer: time,
    }).then(() => {
        wrapper.classList.remove('none');
    });
    document.querySelector('.swal2-actions').innerHTML = '';
    const popup = document.querySelector<HTMLElement>('.swal2-popup');
    popup.style.width = "45rem";
    popup.style.height = "27.8rem";
    popup.style.background = 'gold';
    popup.style.boxShadow = "0 1px 2px rgba(0,0,0,0.07),0 2px 4px rgba(0,0,0,0.07),0 4px 8px rgba(0,0,0,0.07),0 8px 16px rgba(0,0,0,0.07),0 16px 32px rgba(0,0,0,0.07),0 32px 64px rgba(0,0,0,0.07)";
    const backdrop = document.querySelector<HTMLElement>('.swal2-backdrop-show')
    backdrop.style.background = "rgba(0, 0, 0, 0.6)";
    backdrop.style.boxShadow = "rgba(0, 0, 0, 0.7) 19rem 13rem 24rem inset, rgba(0, 0, 0, 0.7) -14rem -9rem 23rem inset";
    const footer = document.querySelector<HTMLElement>('.swal2-footer');
    footer.style.margin = '0';
    footer.style.padding = '1.5em 0 0';
    footer.style.fontSize = '2rem';
    footer.style.fontWeight = 'bold';
}