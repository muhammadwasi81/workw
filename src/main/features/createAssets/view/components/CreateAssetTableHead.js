const CreateAssetHead = () => {
  return (
    <thead>
      <tr className="whitespace-nowrap">
        <th style={{ width: '40px' }}>S:No</th>
        <th style={{ width: '50px' }}>Inventory Name</th>
        <th style={{ width: '50px' }}>Inventory Value</th>
        <th style={{ minWidth: '100px' }}>Serial No</th>
        <th style={{ minWidth: '150px' }}>Category</th>
        <th style={{ minWidth: '150px' }}>Type</th>
        <th style={{ minWidth: '100px' }}>Image</th>
        <th style={{ minWidth: '150px' }}>Handover</th>
        <th style={{ minWidth: '150px' }}>Approvers</th>
      </tr>
    </thead>
  );
};
export default CreateAssetHead;
