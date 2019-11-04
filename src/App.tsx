import { ButtonDemo } from './pages/button';
import { createComponent, onMounted } from './createComponent';
import G6 from '@antv/g6';
const Menu = window.T.Menu

export default createComponent((props, ctx) => {
  const mindMap: G6.TreeGraph | null = null


  function init(instance: G6.TreeGraph) {

    instance = new G6.TreeGraph({
      container: mindEl.value,
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: 2,
      modes: {
        default: [{
          type: 'collapse-expand',
          onChange: (item: any, collapsed: any) => {
            const source = item.get('model').data;
            source.collapsed = collapsed;
            return true;
          }
        },
          'drag-canvas',
          'zoom-canvas',
          'drag-node'
        ]
      },
      defaultNode: {
        size: 16,
        anchorPoints: [[0, 0.5], [1, 0.5]],
        style: {
          fill: '#40a9ff',
          stroke: '#096dd9'
        }
      },
      defaultEdge: {
        shape: 'cubic-horizontal',
        style: {
          stroke: '#A3B1BF'
        }
      },
      layout: {
        type: 'dendrogram',
        direction: 'LR', // H / V / LR / RL / TB / BT
        nodeSep: 30,
        rankSep: 100
      }
    });
    instance.node((node: any) => {
      return {
        size: 26,
        style: {
          fill: '#40a9ff',
          stroke: '#096dd9'
        },
        label: node.id,
        labelCfg: {
          position: node.children && node.children.length > 0 ? 'left' : 'right'
        }
      };
    });
    // instance.on('node:dragstart', ({ currentTarget }) => {
    // })
    instance.on('node:click', ({ currentTarget, item, event }) => {
      const id = item.get('id')
      // targetNode = currentTarget
      const uid = Math.random()
      console.log(uid);
      // currentTarget.addChild({ id: uid }, id)
    })

    instance.data(data);
    instance.render();
    instance.fitView(20);
  }
  onMounted(() => {
    // init(mindMap!)
  });
  return (h) => (
    <div ref='mindEl' ></div>

  )
})


const data = {
  id: 'Modeling Methods',
  children: [
    {
      id: 'Classification',
      children: [
        { id: 'Logistic regression' },
        { id: 'Linear discriminant analysis' },
        { id: 'Rules' },
        { id: 'Decision trees' },
        { id: 'Naive Bayes' },
        { id: 'K nearest neighbor' },
        { id: 'Probabilistic neural network' },
        { id: 'Support vector machine' }
      ]
    },
    {
      id: 'Regression',
      children: [
        { id: 'Multiple linear regression' },
        { id: 'Partial least squares' },
        { id: 'Multi-layer feedforward neural network' },
        { id: 'General regression neural network' },
        { id: 'Support vector regression' }
      ]
    }
  ]
}
