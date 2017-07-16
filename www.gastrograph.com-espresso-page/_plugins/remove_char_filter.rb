module TextFilter
    def remove_characters(input)
        input = input.gsub(/[^\w\s\d\,\.\$\)\(\%\?\!\&\#\;\-\}\{\:\|]+/, '')
    end
end

Liquid::Template.register_filter(TextFilter)
