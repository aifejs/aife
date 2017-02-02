export default function bgGrid(el, {value,}) {
    el.style.backgroundSize = `${value.size}px ${value.size}px`;
    el.style.backgroundImage = `linear-gradient(to right, ${value.color} 0px, transparent 2px),
        linear-gradient(to bottom, ${value.color} 0px, transparent 2px)`;
}