# general-update-pattern
D3.js pattern for handling selections

## Installation

```javascript
npm install general-update-pattern
```

## Usage

Replace old code

```javascript
const selector = 'g.node';

const joinNodes = selection.selectAll(selector).data(nodesData);
joinNodes.enter().append('g').attr('class', 'node');
joinNodes.exit().remove();

const nodes = selection.selectAll(selector)
    .attr('x', 100)
    .attr('y', 100);
```

with cleaner and DRY-er code.

```javascript
const nodes = generalUpdatePattern(() => selection.selectAll('g.node'), nodesData)
  .onEnter(en => en.append('g').attr('class', 'node'))
  .onExit(ex => ex.remove())
  .run();

nodes.attr('x', 100)
    .attr('y', 100);
```

Or if you need all selections

```javascript
const { join, enter, exit, all } = generalUpdatePattern(() => selection.selectAll('g.node'), nodesData)
  // ...
  .run({ returnDetails: true });
```
