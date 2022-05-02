import { getGitExtension } from '.';
import { Ref, Repository } from '../api/git';

interface Branch extends Ref {
    isCurrent: boolean;
}

export const sortBranches = (branches: Branch[]): Branch[] => {
    const currentBranches = branches.filter((branch) => branch.isCurrent);
    const otherBranches = branches.filter((branch) => !branch.isCurrent);

    return [...currentBranches, ...otherBranches];
};

export const selectBranches = async (uri?: any): Promise<Branch[] | undefined> => {
    const git = getGitExtension();
    if (!git) {
        return;
    }

    if (uri) {
        const selectedRepository = git.repositories.find((repository) => {
            return repository.rootUri.path === uri._rootUri.path;
        });

        if (selectedRepository) {
            return getBranches(selectedRepository);
        }
    }

    let branches: Branch[] = [];
    for (const repo of git.repositories) {
        branches = [...branches, ...(await getBranches(repo))];
    }

    return branches;
};

const getBranches = async (repo: Repository) => {
    console.log({ repo });

    const head = await repo.getBranch('HEAD');
    const branches = await repo.getBranches({ remote: false });

    return branches.map((branch) => ({ ...branch, isCurrent: head.name === branch.name }));
};
