var buildTree = function (preorder, inorder) {
    const inorderMap = new Map();
    inorder.forEach((val, idx) => inorderMap.set(val, idx));

    let preIndex = 0;

    const helper = (left, right) => {
        if (left > right) return null;

        const rootVal = preorder[preIndex++];
        const root = new TreeNode(rootVal);

        const mid = inorderMap.get(rootVal);
        root.left = helper(left, mid - 1);
        root.right = helper(mid + 1, right);

        return root;
    };

    return helper(0, inorder.length - 1);
};
