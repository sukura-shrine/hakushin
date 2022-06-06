import ReactDOM from 'react-dom'

function render (props: any) {
  const { container } = props
  ReactDOM.render(
    <div>aaaaaa</div>,
    (container || document).querySelector('#dev-console'),
  )
}
// some code

render({})
