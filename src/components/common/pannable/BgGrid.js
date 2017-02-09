function colorStop(percent, color) {
    return `
        transparent calc(${percent}% - 0.25px),
        ${color} ${percent}%,
        transparent calc(${percent}% + 0.75px)
    `;
}
// TODO: get rid of this directive or find out why it's getting called every mousemove
export default function bgGrid(el, {value,}) {
    const secondaryColor = value.secondaryColor || value.color;
    const colorStops = `
        ${colorStop(25, secondaryColor)},
        ${colorStop(50, secondaryColor)},
        ${colorStop(75, secondaryColor)}`;
    el.style.backgroundSize = `${value.size}px ${value.size}px`;
    el.style.backgroundImage = `
        linear-gradient(
            180deg, 
            ${value.color} 0px, 
            transparent 2px,
            ${colorStops}
        ),
        linear-gradient(
            90deg, 
            ${value.color} 0px, 
            transparent 2px,
            ${colorStops}
        )
    `;
}