export class BaseComponent {
    attachTo(parent, position = "beforeend") {
        parent.insertAdjacentElement(position, this);
    }
}
//# sourceMappingURL=component.js.map