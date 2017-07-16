# https://github.com/multunus/jekyll-author-plugin/
module Jekyll

    class AuthorIndex < Page

        def initialize(site, base, author_dir, author)
            @site = site
            @base = base
            @dir = author_dir
            @name = 'index.html'
            puts "author #{author} @dir #{author_dir}"
            self.process(@name)

            self.read_yaml(File.join(base, '_layouts'), 'blog_author_index.html')
            self.data['author'] = author

            title_prefix                    = site.config['author_title_prefix'] || 'author: '
            self.data['title']              = "#{author}"

            meta_description_prefix         = site.config['author_meta_description_prefix'] || 'author: '
            self.data['description']        = "#{meta_description_prefix}#{author}"

        end
    end

    # The Site class is a built-in Jekyll class with access to global site config information
    class Site

        def write_author_index(author_dir, author)
            index = AuthorIndex.new(self, self.source, author_dir, author)
            index.render(self.layouts, site_payload)
            index.write(self.dest)
            # Record the fact that this page has been added, otherwise Site::cleanup will remove it.
            self.pages << index
        end

        def write_author_indexes
            if self.layouts.key? 'blog_author_index'
                dir = self.config['author_dir'] || 'authors'
                self.posts.each do |post|
                    post_authors = post.data['author']
                    if String.try_convert(post_authors)
                        post_authors = [ post_authors ]
                    end
                    post_authors.each do |author|
                        self.write_author_index(File.join(dir, author.downcase.gsub(' ', '-')), author)
                    end unless post_authors.nil?
                end
            else
                throw "No 'author_index' layout found."
            end
        end
    end

    class GenerateAuthor < Generator
        safe true
        priority :high

        def generate(site)
            site.write_author_indexes
        end
    end
end
