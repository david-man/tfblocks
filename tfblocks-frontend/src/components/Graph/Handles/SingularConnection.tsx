import { Handle, useNodeConnections} from '@xyflow/react';
 
const SingularConnection = (props) => {
  const connections = useNodeConnections({
    handleType: props.type,
    handleId: props.id,
  });
  return (
    <Handle
      {...props}
      style={{background: (connections.length >= 1 ? 'red' : 'green'), ...props.style}}
      isConnectable={connections.length < 1}
    />
  );
};
 
export default SingularConnection;