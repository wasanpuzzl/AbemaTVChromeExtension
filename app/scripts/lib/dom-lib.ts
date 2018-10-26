//DOM操作にまつわる関数集

interface rectFilterOption{
    left14l?: boolean;
    left12l?: boolean;
    left12r?: boolean;
    left34r?: boolean;
    right14r?: boolean;
    right14l?: boolean;
    right12r?: boolean;
    right12l?: boolean;
    right34l?: boolean;
    top14u?: boolean;
    top12u?: boolean;
    top12d?: boolean;
    top34d?: boolean;
    bottom14u?: boolean;
    bottom12u?: boolean;
    bottom12d?: boolean;
    bottom34d?: boolean;
    width12s?: boolean;
    width12b?: boolean;
    width14s?: boolean;
    width14b?: boolean;
    width34s?: boolean;
    width34b?: boolean;
    height14s?: boolean;
    height14b?: boolean;
    height12s?: boolean;
    height12b?: boolean;
    height34s?: boolean;
    height34b?: boolean;
    notBodyParent?: boolean;
    display?: string;
    displayNot?: string;
    filters?: Array<(element: HTMLElement) => boolean>;
}

export function last(array: any[], isNull?: boolean){
    if(array.length<1) return isNull?null:undefined;
    return array[array.length-1];
}
export function parents(element: HTMLElement){
    let parents = [];
    while(element.parentElement){
        parents.push(element.parentElement);
        element = element.parentElement;
    }
    return parents;
}
export function filter(elements: ArrayLike<HTMLElement>, option: rectFilterOption){
    // 要素の位置等で絞り込む
    // option = {left14l: true, ...} left14lはleft座標が1/4より左側(l)であるということ
    return Array.from(elements).filter((element: HTMLElement)=>{
        let b = element.getBoundingClientRect();
        let height = b.height;
        let width = b.width;
        if (option.left14l && b.left>window.innerWidth/4) return false;
        if (option.left12l && b.left>window.innerWidth/2) return false;
        if (option.left12r && b.left<window.innerWidth/2) return false;
        if (option.left34r && b.left<window.innerWidth*3/4) return false;
        if (option.right14r && b.left+b.width<window.innerWidth/4) return false;
        if (option.right14l && b.left+b.width>window.innerWidth/4) return false;
        if (option.right12r && b.left+b.width<window.innerWidth/2) return false;
        if (option.right12l && b.left+b.width>window.innerWidth/2) return false;
        if (option.right34l && b.left+b.width>window.innerWidth*3/4) return false;
        if (option.top14u && b.top>window.innerHeight/4) return false;
        if (option.top12u && b.top>window.innerHeight/2) return false;
        if (option.top12d && b.top<window.innerHeight/2) return false;
        if (option.top34d && b.top<window.innerHeight*3/4) return false;
        if (option.bottom14u && b.top+b.height>window.innerHeight/4) return false;
        if (option.bottom12u && b.top+b.height>window.innerHeight/2) return false;
        if (option.bottom12d && b.top+b.height<window.innerHeight/2) return false;
        if (option.bottom34d && b.top+b.height<window.innerHeight*3/4) return false;
        if (option.width12s && b.width>window.innerWidth/2) return false;//幅が画面の半分より小さいか(大きいとfalse)
        if (option.width12b && b.width<window.innerWidth/2) return false;//〃大きいか
        if (option.width14s && b.width>window.innerWidth/4) return false;
        if (option.width14b && b.width<window.innerWidth/4) return false;
        if (option.width34s && b.width>window.innerWidth*3/4) return false;
        if (option.width34b && b.width<window.innerWidth*3/4) return false;
        if (option.height14s && b.height>window.innerHeight/4) return false;
        if (option.height14b && b.height<window.innerHeight/4) return false;
        if (option.height12s && b.height>window.innerHeight/2) return false;
        if (option.height12b && b.height<window.innerHeight/2) return false;
        if (option.height34s && b.height>window.innerHeight*3/4) return false;
        if (option.height34b && b.height<window.innerHeight*3/4) return false;
        if (option.notBodyParent && (!element.parentElement || /BODY|HTML/i.test(element.parentElement.tagName))) return false;
        if (option.display && element.style.display !== option.display) return false;
        if (option.displayNot && element.style.display === option.displayNot) return false;
        if (option.filters && option.filters.length>0) {
            let flag = true;
            option.filters.forEach(filter => {
                if (flag) {flag = filter(element)}
            });
            if (!flag) return false;
        }
        return true;
    });
}
export function parentsFilterLast(element: HTMLElement, option: rectFilterOption){
    return last(filter(parents(element), option), true);
}
export function parentsFilterLastByArray(elements: ArrayLike<HTMLElement>, option: rectFilterOption){
    let filteredArray: HTMLElement[] = [];
    Array.from(elements).forEach(element=>{
        const lastElement = parentsFilterLast(element, option);
        if(lastElement) filteredArray.push(lastElement);
    });
    return last(filteredArray, true);
}