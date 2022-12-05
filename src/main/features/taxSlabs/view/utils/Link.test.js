import renderer, {create} from 'react-test-renderer';
import Counter from './Link';

// it('changes the class when hovered', () => {
//   const component = renderer.create(
//     <Counter defaultCount={12} />,
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   renderer.act(() => {
//     tree.children[3].props.onClick()
//   });
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
// describe('tesing with conuter', ()=>{
//   test("child test", ()=>{

//   const component = create(
//     <Counter defaultCount={12} />
//   );
//   const instance = component.getInstance();
//   console.log(component)
//   const stateHere = instance.state.count;
//   console.log(stateHere)
//   })
// })