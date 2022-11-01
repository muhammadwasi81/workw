const CreateAssetHead = () => {
  return (
    <thead>
      <tr className="whitespace-nowrap">
        <th style={{ minWidth: '40px' }}>S:No</th>
        <th style={{ minWidth: '100px' }}>Inventory Name</th>
        <th style={{ minWidth: '100px' }}>Inventory Value</th>
        <th style={{ minWidth: '100px' }}>Serial No</th>
        <th style={{ minWidth: '150px' }}>Category</th>
        <th style={{ minWidth: '150px' }}>Type</th>
        <th style={{ minWidth: '150px' }}>Image</th>
        <th style={{ minWidth: '230px' }}>Handover</th>
        <th style={{ minWidth: '250px' }}>Approvers</th>
      </tr>
    </thead>
  );
};
export default CreateAssetHead;
