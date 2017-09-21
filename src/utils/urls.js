export const userUrl = (user) => {
  return `https://api.github.com/users/${user}/repos`
}

export const repoUrl = (repo) => {
  return `https://api.github.com/repos/${repo}/languages`
}
