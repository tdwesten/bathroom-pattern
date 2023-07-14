/**
 * Color enum
 */
var Color;
(function (Color) {
    Color["RED"] = "bg-red-900";
    Color["BLUE"] = "bg-sky-700";
    Color["GREEN"] = "bg-green-700";
    Color["YELLOW"] = "bg-yellow-400";
    Color["ORANGE"] = "bg-yellow-900";
})(Color || (Color = {}));
/**
 * Dot class
 * @param color Color
 * @param index number
 * @returns Dot
 */
var Dot = /** @class */ (function () {
    function Dot(color, index) {
        if (index === void 0) { index = 0; }
        this.color = color;
        this.index = index;
    }
    return Dot;
}());
var Wall = /** @class */ (function () {
    function Wall() {
        this.dots = [];
        this.count = 231;
        this.wrapperElement = document.getElementById("wrapper");
        this.generateDots();
    }
    Wall.prototype.generateDots = function () {
        for (var i = 0; i < this.count; i++) {
            var dot = new Dot(Object.values(Color)[Math.floor(Math.random() * 5)], i);
            var aboveDot = this.getDotAbove(dot);
            var belowDot = this.getDotBelow(dot);
            var leftDot = this.getDotLeft(dot);
            var rightDot = this.getDotRight(dot);
            if ((aboveDot && aboveDot.color === dot.color) ||
                (belowDot && belowDot.color === dot.color) ||
                (leftDot && leftDot.color === dot.color) ||
                (rightDot && rightDot.color === dot.color)) {
                i--;
                continue;
            }
            this.dots.push(dot);
            this.generateDot(dot, this.wrapperElement);
        }
    };
    Wall.prototype.getDotRight = function (dot) {
        var currentRow = Math.floor(dot.index / 11);
        var currentColumn = dot.index % 11;
        var rightRow = currentRow;
        var rightColumn = currentColumn + 1;
        if (rightColumn >= 11) {
            return null;
        }
        var rightIndex = rightRow * 11 + rightColumn;
        if (rightIndex >= this.count) {
            return null;
        }
        return this.dots[rightIndex];
    };
    Wall.prototype.getDotLeft = function (dot) {
        var currentRow = Math.floor(dot.index / 11);
        var currentColumn = dot.index % 11;
        var leftRow = currentRow;
        var leftColumn = currentColumn - 1;
        if (leftColumn < 0) {
            return null;
        }
        var leftIndex = leftRow * 11 + leftColumn;
        if (leftIndex < 0) {
            return null;
        }
        return this.dots[leftIndex];
    };
    Wall.prototype.getDotAbove = function (dot) {
        var currentRow = Math.floor(dot.index / 11);
        var currentColumn = dot.index % 11;
        var aboveRow = currentRow - 1;
        var aboveColumn = currentColumn;
        if (aboveRow < 0) {
            return null;
        }
        var aboveIndex = aboveRow * 11 + aboveColumn;
        if (aboveIndex < 0) {
            return null;
        }
        return this.dots[aboveIndex];
    };
    Wall.prototype.getDotBelow = function (dot) {
        var currentRow = Math.floor(dot.index / 11);
        var currentColumn = dot.index % 11;
        var belowRow = currentRow + 1;
        var belowColumn = currentColumn;
        var belowIndex = belowRow * 11 + belowColumn;
        if (belowIndex >= this.count) {
            return null;
        }
        return this.dots[belowIndex];
    };
    Wall.prototype.generateDot = function (dot, wrapper) {
        var dotElement = document.createElement("div");
        dotElement.classList.add("aspect-square");
        dotElement.classList.add("w-full");
        dotElement.classList.add("rounded-sm");
        dotElement.classList.add("cursor-pointer");
        dotElement.classList.add("hover:scale-90");
        dotElement.classList.add(dot.color);
        dotElement.onclick = function () {
            dotElement.classList.remove(dot.color);
            dot.color = Object.values(Color)[Math.floor(Math.random() * 5)];
            dotElement.classList.add(dot.color);
        };
        wrapper.appendChild(dotElement);
    };
    return Wall;
}());
var wall = new Wall();
